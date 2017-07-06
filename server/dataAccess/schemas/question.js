'use strict';

const BaseSchema = require('./base');

class QuestionSchema extends BaseSchema {
  get() {
    const { Schema, ofType, withDefault, required, objectRef } = this;

    return new Schema({
      rating: withDefault(ofType(Number), 0),
      author: objectRef('User'),
      title: required(ofType(String)),
      description: required(ofType(String)),
      tags: [
        objectRef('Tag')
      ],
      attachments: [
        ofType(String)
      ],
      answers: [
        {
          rating: ofType(Number),
          author: required(objectRef('User')),
          text: required(ofType(String)),
          createdAt: withDefault(required(ofType(Date)), new Date()),
          updatedAt: withDefault(required(ofType(Date)), new Date())
        }
      ]
    },
    {
      timestamps: true
    });
  }
}

module.exports = QuestionSchema;