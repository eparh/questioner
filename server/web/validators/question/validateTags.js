'use strict';

module.exports = (ctx) => {
  ctx.checkQuery('tags').notEmpty();
  return ctx.errors;
};