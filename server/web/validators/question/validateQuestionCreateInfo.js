'use strict';

const idLength = 24;

module.exports = (ctx) => {
  ctx.request.body = ctx.req.body;
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('description').notEmpty();
  ctx.checkBody('author').notEmpty().len(idLength, idLength, 'author\'s length should be 24');
  ctx.checkBody('rating').notEmpty().isInt('rating should be int');
  ctx.checkBody('tags').optional();
  ctx.checkBody('attachments').optional();
  return ctx.errors;
};


