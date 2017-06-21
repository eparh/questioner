'use strict';

const BaseSchema = require('./base');

class UserSchema extends BaseSchema {
  get() {
    const { Schema, ofType, required } = this;

    return new Schema({
      email: required(ofType(String)),
      login: required(ofType(String)),
      pass: required(ofType(String)),
      role: required(ofType(String))
    });
  }
}

module.exports = UserSchema;