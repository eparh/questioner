'use strict';

const { logger } = require('../helpers/iocContainer').getAllDependencies();

module.exports = (app) => {
  app.use(async(ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.res.statusCode = err.status;
      throw err;
    } finally {
      logger.info(`${ctx.req.method} ${ctx.originalUrl} ${ctx.res.statusCode} - ${JSON.stringify(ctx.request.body)}`);
    }
  });
};