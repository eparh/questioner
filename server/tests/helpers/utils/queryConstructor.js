'use strict';

const request = require('supertest-koa-agent');

function sendRequest(app, options) {
  const req = request(app)[options.method](options.url);

  if (options.headers) {
    req.set(options.headers);
  }

  if (options.fields) {
    options.fields.forEach((field) => {
      req.field(field.name, field.value);
    });
  }

  if (options.attachments) {
    options.attachments.forEach((attachment) => {
      req.attach(attachment.name, attachment.value);
    });
  }

  return new Promise((resolve, reject) => {
    req
      .send(options.body)
      .expect(options.expect)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  });
}

module.exports = (app) => {
  return {
    sendRequest: sendRequest.bind(null, app)
  };
};