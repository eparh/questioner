'use strict';

module.exports = async (ctx, next) => {
  ctx.checkBody('name').notEmpty();
  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }
  await next();
};