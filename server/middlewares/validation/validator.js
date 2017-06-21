'use strict';

const { mapper } = require('../../helpers/iocContainer').getAllDependencies();
const { validationError } = require('../../constants').STATUS_CODES;

module.exports = (validateFunction, opts = {}) => {
  opts.part = opts.part || null;

  return (ctx, next) => {
    const validator = ctx.validator;

    validateFunction(validator, opts);

    if (validator.hasErrors()) {
      const errors = validator.getErrors();

      return Promise.reject(mapper.toErrorDTO({
        validationErrors: errors,
        status: validationError
      }));
    } else {
      return next();
    }
  };
};