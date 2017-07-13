'use strict';

const request = require('request');
const serverConfig = require('config').get('server');
const PORT = serverConfig.get('port');

const generalOptions = require('../../integration/data/login');

module.exports = async (user) => {
  const options = Object.assign({}, generalOptions);

  if (user) {
    options.body = JSON.stringify(user);
  }

  return new Promise((resolve, reject) => {
    request(`http://localhost:${PORT}/users/login`, options)
      .on('response', (response) => {
        resolve(response.headers['set-cookie'] && response.headers['set-cookie'].join(';'));
      })
      .on('error', err => {
        reject(err);
      });
  });
};