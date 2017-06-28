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
  }
};

const mapUpdateQuestion = {
  _id: '_id',
  rating: 'rating',
  title: 'title',
  description: 'description',
  author: 'author',
  tags: 'tags',
  answers: 'answers',
  dateOfUpdate: {
    key: 'dateOfUpdate',
    default: now
  }
};

module.exports = {
  mapCreateQuestion,
  mapUpdateQuestion
};
