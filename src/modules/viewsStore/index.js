// Load Redis module implementation dynamically. That's not the best approach, but for the current
// scenario it just works. That it is not needed to actually install a redis server.
// It will always default to 'ioredis-mock' unless 'ioredis' is specified.
const { REDIS_MODULE } = process.env;
const redisPackage = REDIS_MODULE === 'ioredis' ? 'ioredis' : 'ioredis-mock';
// eslint-disable-next-line import/no-dynamic-require
const Redis = require(redisPackage);

const { studios } = require('../../../resources/studios.json');

const store = new Redis(process.env.REDIS_URL);

function incrementStudioViews(rightsOwner) {
  return store.incr(rightsOwner);
}

function resetViewCounters() {
  return Promise.all(studios.map((studio) => store.set(studio.id, 0)));
}

async function getViews() {
  const views = await Promise.all(studios.map((studio) => store.get(studio.id)));
  return views.reduce((acc, viewsCount, idx) => {
    acc[studios[idx].id] = parseInt(viewsCount, 10);
    return acc;
  }, {});
}

async function getViewsFromStudio(studioId) {
  return parseInt((await store.get(studioId)) || 0, 10);
}

module.exports.incrementStudioViews = incrementStudioViews;
module.exports.resetViewCounters = resetViewCounters;
module.exports.getViews = getViews;
module.exports.getViewsFromStudio = getViewsFromStudio;
