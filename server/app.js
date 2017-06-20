'use strict';

const Koa = require('koa');
const configApp = require('./appConfiguration');

module.exports = () => {
  const app = new Koa();

  configApp(app);

  return app;
};