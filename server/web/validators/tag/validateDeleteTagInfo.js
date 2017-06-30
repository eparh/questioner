'use strict';

const idLength = 24;

module.exports = (ctx) => {
  ctx.checkParams('id').notEmpty().len(idLength, idLength, 'questionId\'s length should be 24');
  return ctx.errors;
};