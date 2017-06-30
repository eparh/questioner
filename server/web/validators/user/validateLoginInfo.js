'use strict';

const minLength = 4;
const maxLength = 30;

module.exports = (ctx) => {
  ctx.checkBody('email').notEmpty().len(minLength, maxLength, 'email\'s length should be betwen 4 and 30');
  ctx.checkBody('password').notEmpty().len(minLength, 'password\'s length should be betwen more than 4');
  return ctx.errors;
};

