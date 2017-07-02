'use strict';

const question = require('./general/question');
const answer = require('./general/answer');

module.exports = {
  mapCreateQuestion: question.mapCreateQuestion,
  mapUpdateQuestion: question.mapUpdateQuestion,
  mapCreateAnswer: answer.mapCreateAnswer,
  mapUpdateAnswer: answer.mapUpdateAnswer
};
