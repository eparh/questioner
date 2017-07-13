'use strict';

const session = require('koa-session');
const RedisStore = require('koa2-session-redis');
const config = require('config');
const key = config.get('server.session-cookie');

const CONFIG = {
  key,
  store: new RedisStore()
};

module.exports = (app) => {
  app.keys = ['secret'];
  app.use(session(CONFIG, app));
};