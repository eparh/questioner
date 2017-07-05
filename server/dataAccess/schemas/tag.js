'use strict';

const BaseSchema = require('./base');

class TagSchema extends BaseSchema {
  get() {
    const { Schema, ofType, required, unique } = this;

    return new Schema({
      name: unique(required(ofType(String)))
    });
  }
}

module.exports = TagSchema;