'use strict';

const BaseSchema = require('./base');

class TagSchema extends BaseSchema {
  get() {
    const { Schema, ofType } = this;

    return new Schema({
      name: ofType(String)
    });
  }
}

module.exports = TagSchema;