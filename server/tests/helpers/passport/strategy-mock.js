'use strict';

const passport = require('passport');
const util = require('util');
const user = require('./data/user');

function StrategyMock(options, verify) {
  this.name = 'mock';
  this.passAuthentication = options.passAuthentication || true;
  this.userId = options.userId || user._id;
  this.verify = verify;
}

util.inherits(StrategyMock, passport.Strategy);

StrategyMock.prototype.authenticate = () => {
  if (this.passAuthentication) {
    const user = {
      id: this.userId
    };
    const self = this;

    this.verify(user, (err, resident) => {
      if (err) {
        self.fail(err);
      } else {
        self.success(resident);
      }
    });
  } else {
    this.fail('Unauthorized');
  }
};

module.exports = StrategyMock;