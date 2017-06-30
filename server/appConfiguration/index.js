'use strict';

const connectToDatabase = require('./connectToDatabase');
const configErrorHandling = require('./errorHandling');
const configBodyParser = require('./bodyParser');
const configValidator = require('./validator');
const configRequestLogging = require('./requestLogging');
const configRouting = require('./routing');
const configSession = require('./session');
const configPassport = require('./passport/passport');

module.exports = (app) => {
  connectToDatabase();
  configErrorHandling(app);
  configBodyParser(app);
  configSession(app);
  configPassport(app);
  configValidator(app);
  configRequestLogging(app);
  configRouting(app);
};