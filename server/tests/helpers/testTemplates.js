'use strict';

const statusCodes = require('../../constants').STATUS_CODES;

function errorAuthTest(opts) {
  const { text, method } = opts;

  it(text, async () => {
    await opts.queryConstructor.sendRequest({
      method,
      url: opts.url,
      expect: statusCodes.unauthorized
    });
  });
}

module.exports = {
  errorAuthTest
};
