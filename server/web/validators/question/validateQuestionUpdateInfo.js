'use strict';

const idLength = 24;

module.exports = (ctx) => {
  ctx.checkBody('_id').notEmpty().len(idLength, idLength, 'id\'s length should be 24');
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('description').notEmpty();
  ctx.checkBody('rating').notEmpty().isInt('rating should be int');
  ctx.checkBody('tags').optional();
  ctx.checkBody('attachments').optional();
  return ctx.errors;
};