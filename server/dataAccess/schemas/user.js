'use strict';

const BaseSchema = require('./base');

class QuestionSchema extends BaseSchema {
  get() {
    const {Schema, ofType, required} = this;

    return new Schema({
      email : required(ofType(String)),
      pass : required(ofType(String))
    });
  }
}