'use strict';

const Koa = require('koa');
const serverConfig = require('config').get('server');
const { logger } = require('../../../helpers/iocContainer').getAllDependencies();
const configApp = require('../../../appConfiguration/index');
const { clearAllCollections } = require('../database');

let server;
const iocContainer = require('../../../helpers/iocContainer');
const dbContext = iocContainer.resolve('dbContext');

module.exports = {
  before: () => {
    return new Promise((resolve) => {
      const app = new Koa();

      configApp(app);

      server = app.listen(serverConfig.get('port'), async () => {
        logger.info('Server listening on port');
        await clearAllCollections();
        resolve(app);
      });
    });
  },
  after: () => {
    return new Promise((resolve) => {
      server.close(async () => {
        dbContext.disconnect();
        resolve();
      });
    });
  }
};