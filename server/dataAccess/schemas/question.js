'use strict';

const BaseSchema = require('./base');
const AnswerSchema = require('./embedded/answer');
const rating = require('./virtual/rating');

class QuestionSchema extends BaseSchema {
  get() {
    const { Schema, ofType, required, objectRef, includeVirtuals } = this;

    const questionSchema = new Schema({
      author: required(objectRef('User')),
      title: required(ofType(String)),
      description: required(ofType(String)),
      tags: [
        objectRef('Tag')
      ],
      attachments: [
        ofType(String)
      ],
      voters: ofType(Object),
      answers: [(new AnswerSchema()).get()]
    },
    {
      timestamps: true,
      toObject: includeVirtuals(),
      toJSON: includeVirtuals()
    });

    questionSchema.virtual('rating')
      .get(function() {
        return rating(this);
      });

    return questionSchema;
  }
}

module.exports = QuestionSchema;