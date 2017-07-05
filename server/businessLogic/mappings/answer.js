'use strict';

const mapCreateAnswer = {
  rating: {
    key: 'rating',
    default: 0
  },
  title: 'title',
  text: 'text'
};

const mapUpdateAnswer = {
  _id: '_id',
  rating: {
    key: 'rating',
    default: 0
  },
  title: 'title',
  text: 'text'
};

module.exports = {
  mapCreateAnswer,
  mapUpdateAnswer
};
