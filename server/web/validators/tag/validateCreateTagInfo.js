'use strict';

const config = require('config');
const tagMinLength = config.get('validation.tagMinLength');
const tagMaxLength = config.get('validation.tagMaxLength');

module.exports = (ctx) => {
  ctx.checkBody('name').notEmpty().len(tagMinLength, tagMaxLength);
};