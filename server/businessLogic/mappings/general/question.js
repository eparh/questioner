'use strict';

const toObjectId = require('../../../helpers/objectIdConverter');
const now = new Date();

const mapCreateQuestion = {
  rating: 'rating',
  title: 'title',
  description: 'description',
  author: {
    key: 'author',
    transform: (value) => toObjectId(value)
  },
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
  _id: {
    key: '_id',
    transform: (value) => toObjectId(value)
  },
  rating: 'rating',
  title: 'title',
  description: 'description',
  author: {
    key: 'author',
    transform: (value) => toObjectId(value)
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
