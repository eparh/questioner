'use strict';

const mapCreateQuestion = {
  title: 'title',
  description: 'description',
  tags: 'tags',
  answers: {
    key: 'answers',
    default: []
  },
  voters: {
    key: 'voters',
    default: {}
  }
};

const mapUpdateQuestion = {
  _id: '_id',
  title: 'title',
  description: 'description',
  tags: 'tags',
  answers: {
    key: 'answers',
    default: []
  },
  voters: {
    key: 'voters',
    default: {}
  }
};

module.exports = {
  mapCreateQuestion,
  mapUpdateQuestion
};
