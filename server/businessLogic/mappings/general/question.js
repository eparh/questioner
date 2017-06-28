'use strict';

const now = new Date();

const mapCreateQuestion = {
  rating: 'rating',
  title: 'title',
  description: 'description',
  author: 'author',
  tags: 'tags',
  dateOfCreation: {
    key: 'dateOfCreation',
    default: now
  },
  dateOfUpdate: {
    key: 'dateOfUpdate',
    default: now
  },
  answers: {
    key: 'answers',
    default: []
  }
};

const mapUpdateQuestion = {
  _id: '_id',
  rating: 'rating',
  title: 'title',
  description: 'description',
  author: 'author',
  tags: 'tags',
  answers: {
    key: 'answers',
    default: []
  },
  dateOfUpdate: {
    key: 'dateOfUpdate',
    default: now
  }
};

module.exports = {
  mapCreateQuestion,
  mapUpdateQuestion
};
