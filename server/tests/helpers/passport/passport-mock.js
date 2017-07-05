'use strict';

const passport = require('passport');
const StrategyMock = require('./strategy-mock');
const verifyFunction = require('./verifyFunction');

module.exports = function(app, options) {
  passport.use(new StrategyMock(options, verifyFunction));

  app.use(passport.authenticate('mock'));
};

