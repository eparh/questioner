'use strict';

const session = require('koa-session');
const CONFIG = {
  key: 'koa:sess'
};

module.exports = (app) => {
  app.keys = ['secret'];
  app.use(session(CONFIG, app));
};