'use strict';

const BaseSchema = require('../base');

class AnswerSchema extends BaseSchema {
  get() {
    const { Schema, ofType, required, objectRef } = this;

    return new Schema({
      rating: ofType(Number),
      author: required(objectRef('User')),
      text: required(ofType(String))
    },
    {
      toObject: {
        virtuals: true
      },
      toJSON: {
        virtuals: true
      }
    });
  }
}

module.exports = AnswerSchema;