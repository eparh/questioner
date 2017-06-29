'use strict';

module.exports = async (ctx, next) => {
  ctx.checkQuery('tags').notEmpty();
  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }
  await next();
};