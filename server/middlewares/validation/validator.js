'use strict';

module.exports = (validateFunction) => {
  return (ctx, next) => {
    const errors = validateFunction(ctx);

    if (errors) {
      ctx.body = errors;
      return;
    }
    return next();
  };
};
