'use strict';

const bodyParser = require('koa-body');

module.exports = (app) => {
  app.use(bodyParser({
    multipart: true
  }));
};