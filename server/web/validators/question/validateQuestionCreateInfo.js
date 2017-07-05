'use strict';

const config = require('config');
const rating = config.get('validation.messages.rating');

module.exports = (ctx) => {
  //  ctx.request.body = ctx.req.body;
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('description').notEmpty();
  ctx.checkBody('rating').notEmpty().isInt(rating);
  ctx.checkBody('tags').optional();
  ctx.checkBody('attachments').optional();
  return ctx.errors;
};


