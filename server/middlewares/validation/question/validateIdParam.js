'use strict';

const idLength = 24;

module.exports = async (ctx, next) => {
  ctx.checkParams('id').notEmpty().len(idLength, idLength, 'id\'s length should be 24');
  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }
  await next();
};