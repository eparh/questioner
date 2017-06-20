'use strict';

const { dbContext } = require('../helpers/iocContainer').getAllDependencies();

module.exports = () => {
  dbContext.connect();
};