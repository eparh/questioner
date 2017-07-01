'use strict';

const path = require('path');
const config = require('config');
const multer = require('koa-multer');
const mime = require('mime');

const storage = multer.diskStorage({
  destination: path.join(config.get('server.uploadDir')),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${mime.extension(file.mimetype)}`);
  }
});

module.exports = (opts) => {
  const fullOpts = Object.assign({
    limits: {
      fileSize: 300000000
    }
  }, opts);

  return multer({
    limits: fullOpts.limits,
    storage
  });
};