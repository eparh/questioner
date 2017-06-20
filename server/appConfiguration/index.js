'use strict';

const connectToDatabase = require('./connectToDatabase');
const configErrorHandling = require('./errorHandling');
const configBodyParser = require('./bodyParser');
const configValidator = require('./validator');
const configRequestLogging = require('./requestLogging');
const configRouting = require('./routing');

module.exports = (app) => {
  connectToDatabase();
  configErrorHandling(app);
  configBodyParser(app);
  configValidator(app);
  configRequestLogging(app);
  configRouting(app);
};