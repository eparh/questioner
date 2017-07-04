'use strict';

const config = require('config');
const idLength = config.get('validation.idLength');
const idMessage = config.get('validation.messages.idLength');

module.exports = (ctx) => {
  ctx.request.body = ctx.req.body;
  ctx.checkParams('id').notEmpty().len(idLength, idLength, idMessage);
  return ctx.errors;
};