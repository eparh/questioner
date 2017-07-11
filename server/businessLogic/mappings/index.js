'use strict';

const { mapCreateQuestion, mapUpdateQuestion } = require('./question');
const { mapCreateAnswer, mapUpdateAnswer } = require('./answer');
const { mapCreateTag, mapUpdateTag } = require('./tag');

module.exports = {
  mapCreateQuestion,
  mapUpdateQuestion,
  mapCreateAnswer,
  mapUpdateAnswer,
  mapCreateTag,
  mapUpdateTag
};
