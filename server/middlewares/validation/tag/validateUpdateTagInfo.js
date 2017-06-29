'use strict';

const idLength = 24;

module.exports = async (ctx, next) => {
  ctx.checkBody('_id').notEmpty().len(idLength, idLength, 'id\'s length should be 24');
  ctx.checkBody('name').notEmpty();
  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }
  await next();
};