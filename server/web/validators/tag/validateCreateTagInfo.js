'use strict';

module.exports = (ctx) => {
  ctx.checkBody('name').notEmpty();
  return ctx.errors;
};