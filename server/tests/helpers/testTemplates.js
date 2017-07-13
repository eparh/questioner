'use strict';

const { forbidden, unauthorized } = require('../../constants').STATUS_CODES;

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

  it(text, async () => {
    await opts.queryConstructor.sendRequest({
      method,
      url: opts.url,
      expect: forbidden,
      headers: opts.headers
    });
  });
}

module.exports = {
  errorAuthTest,
  errorNotAdminTest
};
