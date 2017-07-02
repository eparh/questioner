'use strict';

module.exports = (ctx) => {
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('description').notEmpty();
  ctx.checkBody('rating').notEmpty().isInt('rating should be int');
  ctx.checkBody('tags').optional();
  ctx.checkBody('attachments').optional();
  return ctx.errors;
};


