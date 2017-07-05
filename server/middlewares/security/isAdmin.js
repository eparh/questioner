'use strict';

const { success } = require('../../constants/').STATUS_CODES;

module.exports = () => {
  return (ctx, next) => {
    const user = ctx.state.user;

    return user.role === 'admin' ? next() : ctx.res(success);
  };
};