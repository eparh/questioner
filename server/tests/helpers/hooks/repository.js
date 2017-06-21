'use strict';

const { dbContext } = require('../../../helpers/iocContainer').getAllDependencies();
const { clearAllCollections } = require('../../helpers/database');

module.exports = {
  before: async () => {
    dbContext.connect();
    await clearAllCollections();
  },
  after: async () => {
    await clearAllCollections();
    dbContext.disconnect();
  }
};
