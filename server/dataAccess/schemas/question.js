'use strict';

const BaseSchema = require('./base');
const AnswerSchema = require('./embedded/answer');

class QuestionSchema extends BaseSchema {
  get() {
    const { Schema, ofType, required, objectRef } = this;

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
      toObject: {
        virtuals: true
      },
      toJSON: {
        virtuals: true
      }
    });

    questionSchema.virtual('rating')
      .get(function() {
        const voters = Object.assign({}, this.voters);

        return Object.values(voters).reduce((sum, value) => {
          return sum + value;
        }, 0);
      });

    return questionSchema;
  }
}

module.exports = QuestionSchema;