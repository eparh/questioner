'use strict';

const { validationError, success } = require('../../constants/').STATUS_CODES;
const passport = require('passport');

module.exports = (ctx, next) => {
  return passport.authenticate('local', (err, user) => {
    if (err || !user) {
      ctx.status = validationError;
      return;
    }
    ctx.body = user;
    ctx.login(user);
    ctx.status = success;
    next();
  })(ctx, next);
};