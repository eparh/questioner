'use strict';

const idLength = 24;

module.exports = (ctx) => {
  ctx.checkParams('questionId').notEmpty().len(idLength, idLength, 'id\'s length should be 24');

  ctx.checkBody('text').notEmpty();
  ctx.checkBody('author').notEmpty().len(idLength, idLength, 'author\'s length should be 24');
  ctx.checkBody('rating').notEmpty();
  return ctx.errors;
};