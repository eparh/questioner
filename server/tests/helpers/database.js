'use strict';

const { dbContext } = require('../../helpers/iocContainer').getAllDependencies();

function clearAllCollections() {
  const removeQueries = Object.values(dbContext.models).reduce((queries, model) => {
    queries.push(model.remove({}));
    return queries;
  }, []);

  return Promise.all(removeQueries);
}

function clearCollections(modelsToClean = []) {
  const modelsList = dbContext.models;
  const removeQueries = Object.keys(modelsList)
    .filter(mName => modelsToClean.includes(mName))
    .map(mName => modelsList[mName])
    .map(model => model.remove({}));

  return Promise.all(removeQueries);
}

module.exports = {
  clearAllCollections,
  clearCollections
};
