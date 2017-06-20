'use strict';

const validator = require('koa-dee-validator');

module.exports = (app) => {
  app.use(validator());
};