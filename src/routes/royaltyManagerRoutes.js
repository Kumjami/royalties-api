const express = require('express');
const find = require('lodash.find');
const decimal = require('decimal.js');

const views = require('../modules/viewsStore');
const { validate } = require('../modules/validator/viewing');
const { studios } = require('../../resources/studios.json');
const { episodes } = require('../../resources/episodes.json');

const router = express.Router();

router.use((req, res, next) => {
  req.log.info({
    method: req.method,
    path: req.originalUrl,
  }, 'New HTTP request');
  next();
});

router.post('/viewing', async (req, res, next) => {
  try {
    const { episode, customer } = validate(req.body);
    req.log.info({ episode, customer }, 'New viewing request');

    const viewedEpisode = find(episodes, { id: episode });
    if (!viewedEpisode) {
      req.log.warn({ episode }, 'The episode does not exist');
      return res.status(400).send({ error: 'The episode does not exist' });
    }

    await views.incrementStudioViews(viewedEpisode.rightsowner);
    return res.status(202).end();
  } catch (err) {
    return next(err);
  }
});

router.post('/reset', async (req, res, next) => {
  try {
    req.log.info('New reset request');
    await views.resetViewCounters();
    return res.status(202).end();
  } catch (err) {
    return next(err);
  }
});

router.get('/payments', async (req, res, next) => {
  try {
    req.log.info('New payments request');
    const viewsCounters = await views.getViews();
    return res.send(studios.map((studio) => ({
      rightsownerId: studio.id,
      rightsowner: studio.name,
      royalty: decimal.mul(viewsCounters[studio.id] || 0, studio.payment).toNumber(),
      viewings: viewsCounters[studio.id] || 0,
    })));
  } catch (err) {
    return next(err);
  }
});

router.get('/payments/:studioId', async (req, res, next) => {
  try {
    const { studioId } = req.params;
    req.log.info({ studioId }, 'New studio payment request');

    const rightsOwner = find(studios, { id: studioId });
    if (!rightsOwner) {
      req.log.warn({ studioId }, 'The studio does not exist');
      return res.status(404).send({ error: 'The studio does not exist' });
    }

    const viewsCounters = await views.getViewsFromStudio(rightsOwner.id);
    return res.send({
      rightsowner: rightsOwner.name,
      royalty: decimal.mul(viewsCounters, rightsOwner.payment).toNumber(),
      viewings: viewsCounters,
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
