'use strict';

const idLength = 24;

module.exports = async (ctx, next) => {
  ctx.checkParams('questionId').notEmpty();

  ctx.checkBody('_id').notEmpty().len(idLength, idLength, 'id\'s length should be 24');
  ctx.checkBody('text').notEmpty();
  ctx.checkBody('author').notEmpty().len(idLength, idLength, 'author\'s length should be 24');
  ctx.checkBody('rating').notEmpty();
  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }
  await next();
};