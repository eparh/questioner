'use strict';

function authenticationMiddleware () {
  return (ctx, next) => {
    if (ctx.isAuthenticated()) {
      return next();
    }
    ctx.redirect('/users/login');
  };
}

module.exports = authenticationMiddleware;