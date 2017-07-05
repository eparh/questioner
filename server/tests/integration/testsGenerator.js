'use strict';

const statusCodes = require('../../constants').STATUS_CODES;

function generateErrorAuthTest(opts) {
  const { text, method } = opts;

  it(text, async () => {
    await opts.queryConstructor.sendRequest({
      method,
      url: opts.url,
      expect: statusCodes.unauthorized
    });
  });
}

function generateErrorValidationTest(opts) {
  const { text, method, fieldsInError } = opts;

  it(text, async () => {
    const response = await opts.queryConstructor.sendRequest({
      method,
      url: opts.url,
      body: opts.body,
      headers: opts.headers,
      fields: opts.fields,
      expect: statusCodes.validationError
    });

    const errors = response.body;

    errors.should.have.property('validationErrors');
    errors.validationErrors.should.have.properties(fieldsInError);
  });
}

module.exports = {
  generateErrorAuthTest,
  generateErrorValidationTest
};