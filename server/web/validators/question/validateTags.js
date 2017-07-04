'use strict';

module.exports = (ctx) => {
  ctx.request.body = ctx.req.body;
  ctx.checkQuery('tags').notEmpty();
  return ctx.errors;
};