'use strict';

const mongoose = require('mongoose');

module.exports = (name, Schema) => {
  return mongoose.model(name, (new Schema()).get());
};