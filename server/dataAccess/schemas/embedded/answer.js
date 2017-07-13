'use strict';

const BaseSchema = require('../base');
const rating = require('../virtual/rating');

class AnswerSchema extends BaseSchema {
  get() {
    const {
      Schema, ofType, required, objectRef, includeVirtuals, withTimeStamps
    } = this;

    const answerSchema = new Schema({
      voters: ofType(Object),
      author: required(objectRef('User')),
      text: required(ofType(String))
    },
    withTimeStamps(includeVirtuals()));

    answerSchema.virtual('rating')
      .get(function() {
        return rating(this);
      });

    return answerSchema;
  }
}

module.exports = AnswerSchema;