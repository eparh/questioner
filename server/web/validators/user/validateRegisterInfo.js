'use strict';

const config = require('config');
const minLength = config.get('validation.tagMinLength');
const maxLength = config.get('validation.tagMaxLength');

module.exports = (ctx) => {
  ctx.checkBody('email').notEmpty().len(minLength, maxLength, 'email\'s length should be between 4 and 30');
  ctx.checkBody('password').notEmpty().len(minLength, maxLength, 'password\'s length should be more than 4');
  return ctx.errors;
};

