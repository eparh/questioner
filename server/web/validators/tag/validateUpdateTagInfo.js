'use strict';

const idLength = 24;

module.exports = (ctx) => {
  ctx.checkBody('_id').notEmpty().len(idLength, idLength, 'id\'s length should be 24');
  ctx.checkBody('name').notEmpty();
  return ctx.errors;
};