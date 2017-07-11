'use strict';

const config = require('config');
const idLength = config.get('validation.idLength');
const idMessage = config.get('validation.messages.idLength');
const tagMinLength = config.get('validation.tagMinLength');
const tagMaxLength = config.get('validation.tagMaxLength');

module.exports = (ctx) => {
  ctx.checkBody('_id').notEmpty().len(idLength, idLength, idMessage);
  ctx.checkBody('name').notEmpty().len(tagMinLength, tagMaxLength);
};