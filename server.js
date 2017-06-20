'use strict';

const config = require('config');
const port = process.env.PORT || config.get('server.port');

const { logger } = require('./server/helpers/iocContainer').getAllDependencies();
const app = require('./server/app')();

app.listen(port, () => logger.info(`Server listening on port ${port}`));
