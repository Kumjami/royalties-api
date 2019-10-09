const { studios } = require('../../../resources/studios.json');

const counter = {};
function incrementStudioViews(rightsOwner) {
  if (!counter[rightsOwner]) counter[rightsOwner] = 0;
  counter[rightsOwner] += 1;
}

function resetViewCounters() {
  studios.forEach((studio) => { counter[studio] = 0; });
}

function getViews() {
  return counter;
}

function getViewsFromStudio(studioId) {
  return counter[studioId] || 0;
}

module.exports.incrementStudioViews = incrementStudioViews;
module.exports.resetViewCounters = resetViewCounters;
module.exports.getViews = getViews;
module.exports.getViewsFromStudio = getViewsFromStudio;
