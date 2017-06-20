'use strict';

const winston = require('winston');
const config = require('config').get('server.logger');

class Logger {
  constructor() {
    this.loggerConfig = config;

    this.initialize();
  }

  initialize() {
    const self = this;
    const transports = [];

    self._setConsoleTransport(transports);

    self._logger = new winston.Logger({
      transports
    });
  }

  info(message) {
    this._logger.info(`pid = ${process.pid}`);
    this._logger.info(message);
  }

  error(message) {
    this._logger.info(`pid = ${process.pid}`);
    this._logger.error(message);
  }

  logDb(message) {
    this._logger.info(message);
  }

  _setConsoleTransport(transports) {
    if (this.loggerConfig.get('transports').indexOf('console') !== -1) {
      transports.push(new winston.transports.Console({
        timestamp: true
      }));
    }
  }
}

module.exports = Logger;