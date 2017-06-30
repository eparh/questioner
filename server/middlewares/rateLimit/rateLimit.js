'use strict';

const ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');

module.exports = ratelimit({
  db: new Redis(),
  duration: 60000,
  errorMessage: 'Sometimes You Just Have to Slow Down.',
  id: (ctx) => ctx.ip,
  headers: {
    remaining: 'Rate-Limit-Remaining',
    reset: 'Rate-Limit-Reset',
    total: 'Rate-Limit-Total'
  },
  max: 100
});