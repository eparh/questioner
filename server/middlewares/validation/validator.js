'use strict';

const { validationError } = require('../../constants').STATUS_CODES;

module.exports = (validateFunction) => {
  return (ctx, next) => {
    validateFunction(ctx);

    if (ctx.errors) {
      return Promise.reject({
        validationErrors: ctx.errors,
        status: validationError
      });
    }
    return next();
  };
};
