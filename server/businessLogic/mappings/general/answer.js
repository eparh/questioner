'use strict';

const now = new Date();

const mapCreateAnswer = {
  rating: {
    key: 'rating',
    default: 0
  },
  title: 'title',
  text: 'text',
  author: 'author',
  dateOfCreation: {
    key: 'dateOfCreation',
    default: now
  },
  dateOfUpdate: {
    key: 'dateOfUpdate',
    default: now
  }
};


module.exports = {
  mapCreateAnswer
};
