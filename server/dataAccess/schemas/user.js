'use strict';

const BaseSchema = require('./base');

class UserSchema extends BaseSchema {
  get() {
    const {
      Schema, ofType, required, unique, toEnum, trim, lowercase, withDefault
    } = this;

    return new Schema({
      email: unique(required(ofType(String))),
      password: required(ofType(String)),
      role: trim(lowercase(withDefault(toEnum(required(ofType(String)), ['admin', 'user']), 'user')))
    });
  }
}

module.exports = UserSchema;