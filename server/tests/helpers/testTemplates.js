'use strict';

const { forbidden, unauthorized, validationError } = require('../../constants').STATUS_CODES;
const login = require('../helpers/hooks/login');

function errorAuthTest(opts) {
  const { text, method } = opts;

  it(text, async () => {
    await opts.queryConstructor.sendRequest({
      method,
      url: opts.url,
      expect: unauthorized
    });
  });
}

function errorNotAdminTest(opts) {
  const { text, method } = opts;
  let userCookies;

  before(async () => {
    userCookies = await login();
  });

  it(text, async () => {
    await opts.queryConstructor.sendRequest({
      method,
      url: opts.url,
      expect: forbidden,
      headers: {
        cookie: userCookies
      }
    });
  });
}

function errorValidationTest(opts) {
  const { text, method } = opts;

  it(text, () => {
    opts.queryConstructor.sendRequest({
      method,
      url: opts.url,
      expect: validationError,
      headers: opts.headers
    });
  });
}

module.exports = {
  errorAuthTest,
  errorNotAdminTest,
  errorValidationTest
};
