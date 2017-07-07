'use strict';

module.exports = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'test@gmail.com',
    password: 'password'
  })
};