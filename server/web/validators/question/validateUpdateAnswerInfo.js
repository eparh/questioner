'use strict';

const idLength = 24;

module.exports = (ctx) => {
  ctx.checkParams('questionId').notEmpty();

  ctx.checkBody('_id').notEmpty().len(idLength, idLength, 'id\'s length should be 24');
  ctx.checkBody('text').notEmpty();
  ctx.checkBody('rating').notEmpty().isInt('rating should be int');
  return ctx.errors;
};