'use strict';

const question = require('./question');
const answer = require('./answer');

module.exports = {
  mapCreateQuestion: question.mapCreateQuestion,
  mapUpdateQuestion: question.mapUpdateQuestion,
  mapCreateAnswer: answer.mapCreateAnswer,
  mapUpdateAnswer: answer.mapUpdateAnswer
};
