'use strict';

const idLength = 24;

module.exports = async (ctx, next) => {
  ctx.checkParams('questionId').notEmpty().len(idLength, idLength, 'questionId\'s length should be 24');
  ctx.checkParams('answerId').notEmpty().len(idLength, idLength, 'questionId\'s length should be 24');
  ctx.checkParams('direction').notEmpty();
  if (ctx.errors) {
    ctx.body = ctx.errors;
    return;
  }
  await next();
};