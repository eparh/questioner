'use strict';

const statusCodes = require('../../constants');

module.exports = (validateFunction) => {
  return (ctx, next) => {
    validateFunction(ctx);

    if (ctx.errors) {
      ctx.status = statusCodes.validationError;
      ctx.body = ctx.errors;
    }
    return next();
  };
};
