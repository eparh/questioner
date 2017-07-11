'use strict';

const config = require('config');
const idLength = config.get('validation.idLength');
const idMessage = config.get('validation.messages.idLength');

module.exports = (ctx) => {
  if (ctx.req.body) {
    ctx.request.body = ctx.req.body;
  }
  ctx.checkBody('_id').notEmpty().len(idLength, idLength, idMessage);
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('description').notEmpty();
  ctx.checkBody('tags').optional();
  ctx.checkBody('attachments').optional();
};