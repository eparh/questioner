'use strict';

const { forbidden, unauthorized } = require('../../constants/').STATUS_CODES;

module.exports = (ctx, next) => {
  const user = ctx.state.user;

  if (!user) {
    ctx.status = unauthorized;
    return;
  }

  if (user.role === 'admin') {
    return next();
  }

  ctx.status = forbidden;
};