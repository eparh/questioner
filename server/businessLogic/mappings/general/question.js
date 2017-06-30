'use strict';

const mapCreateQuestion = {
  rating: 'rating',
  title: 'title',
  description: 'description',
  author: 'author',
  tags: 'tags',
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
  }
};

module.exports = {
  mapCreateQuestion,
  mapUpdateQuestion
};
