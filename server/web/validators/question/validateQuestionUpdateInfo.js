'use strict';

const config = require('config');
const idLength = config.get('validation.idLength');
const idMessage = config.get('validation.messages.idLength');
const rating = config.get('validation.messages.rating');

module.exports = (ctx) => {
  // ctx.request.body = ctx.req.body;
  ctx.checkBody('_id').notEmpty().len(idLength, idLength, idMessage);
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('description').notEmpty();
  ctx.checkBody('rating').notEmpty().isInt(rating);
  ctx.checkBody('tags').optional();
  ctx.checkBody('attachments').optional();
};