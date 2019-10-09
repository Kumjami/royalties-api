const express = require('express');
const find = require('lodash.find');
const decimal = require('decimal.js');

const royalties = require('../modules/royalties');
const { validate } = require('../modules/validator/viewing');
const { studios } = require('../../resources/studios.json');
const { episodes } = require('../../resources/episodes.json');

const router = express.Router();

router.post('/viewing', (req, res, next) => {
  try {
    const { episode, customer } = validate(req.body);
    req.log.info({
      episode,
      customer,
      method: 'POST',
      path: req.originalUrl,
    }, 'New viewing request');

    const viewedEpisode = find(episodes, { id: episode });
    if (!viewedEpisode) {
      req.log.warn({ episode }, 'The episode does not exist');
      return res.status(404).send({ error: 'The episode does not exist' });
    }

    royalties.incrementStudioViews(episode.rightsowner);
    return res.status(202).end();
  } catch (err) {
    return next(err);
  }
});

router.post('/reset', (req, res, next) => {
  try {
    req.log.info('New reset request');
    royalties.resetViewCounters();
    return res.status(202).end();
  } catch (err) {
    return next(err);
  }
});

router.get('/payments', (req, res, next) => {
  try {
    req.log.info('New payments request');
    const views = royalties.getViews();
    return res.send(studios.map((studio) => ({
      rightsownerId: studio.id,
      rightsowner: studio.name,
      royalty: decimal.mul(views[studio.id] || 0, studio.payment).toNumber(),
      viewings: views[studio.id] || 0,
    })));
  } catch (err) {
    return next(err);
  }
});

router.get('/payments/:studioId', (req, res, next) => {
  try {
    const { studioId } = req.params;
    req.log.info({ studioId }, 'New studio payment request');

    const rightsOwner = find(studios, { id: studioId });
    if (!rightsOwner) {
      req.log.warn({ studioId }, 'The studio does not exist');
      return res.status(404).send({ error: 'The studio does not exist' });
    }

    const views = royalties.getViewsFromStudio(rightsOwner.id);
    return res.send({
      rightsowner: rightsOwner.name,
      royalty: decimal.mul(views, rightsOwner.payment).toNumber(),
      viewings: views,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
