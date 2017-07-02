'use strict';

const config = require('config');
const idLength = config.get('validation.idLength');
const idMessage = config.get('validation.messages.idLength');
const rating = config.get('validation.messages.rating');

module.exports = (ctx) => {
  ctx.checkParams('questionId').notEmpty().len(idLength, idLength, idMessage);

  ctx.checkBody('text').notEmpty();
  ctx.checkBody('rating').notEmpty().isInt(rating);
  return ctx.errors;
};