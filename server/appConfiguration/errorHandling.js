'use strict';

const { logger } = require('../helpers/iocContainer').getAllDependencies();
const { validationError } = require('../constants').STATUS_CODES;

module.exports = (app) => {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      /* istanbul ignore if */
      if (err.code) {
        err.status = validationError;
      }

      logger.error(err);

      ctx.body = err;
      ctx.status = err.status;
    }
  });
};