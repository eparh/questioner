'use strict';

const mongoose = require('mongoose');

const tagsToCreate = [
  {
    name: 'Javascript'
  },
  {
    name: 'Nodejs'
  }
];
const tagToCreate = {
  name: 'Easy'
};
const tagToUpdate = {
  name: 'Sophisticated'
};

module.exports = {
  tagsToCreate,
  tagToCreate,
  tagToUpdate,
  fakeId: new mongoose.Types.ObjectId()
};