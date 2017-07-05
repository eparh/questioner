'use strict';

module.exports = (user, done) => {
  const mock = require('./data/user');

  done(null, mock);
};