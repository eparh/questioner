'use strict';

function authenticationMiddleware () {
  return (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    }
    ctx.status = 401;
  };
}

module.exports = authenticationMiddleware;