'use strict';

const BaseSchema = require('../base');

class AnswerSchema extends BaseSchema {
  get() {
    const { Schema, ofType, required, objectRef } = this;

    const answerSchema = new Schema({
      voters: ofType(Object),
      author: required(objectRef('User')),
      text: required(ofType(String))
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

    answerSchema.virtual('rating')
      .get(function() {
        const voters = Object.assign({}, this.voters);

        return Object.values(voters).reduce((sum, value) => {
          return sum + value;
        }, 0);
      });

    return answerSchema;
  }
}

module.exports = AnswerSchema;