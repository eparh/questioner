'use strict';

const request = require('request');
const serverConfig = require('config').get('server');
const PORT = serverConfig.get('port');

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'test@gmail.com',
    password: 'password'
  })
};

module.exports = async () => {
  await request('http://localhost:3001/users/logout', {
    method: 'POST'
  });

  return new Promise((resolve, reject) => {
    request(`http://localhost:${PORT}/users/login`, options)
      .on('response', (response) => {
        resolve(response.headers['set-cookie'].join(';'));
      })
      .on('error', err => {
        reject(err);
      });
  });
};