'use strict';

const { unauthorized } = require('../../constants/').STATUS_CODES;

function authenticationMiddleware () {
  return (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    }
    ctx.status = unauthorized;
  };
}

module.exports = authenticationMiddleware;