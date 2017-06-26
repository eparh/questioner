'use strict';

const path = require('path');

const config = require('config').get('database');
const mongoose = require('mongoose');

const filesHelper = require('../helpers/filesHelper');

class DbContext {
  constructor() {
    this.db = mongoose;
    this.models = {};

    mongoose.Promise = Promise;

    this._setModels();
  }

  connect() {
    const { uri, options } = config;

    return this.db.connect(uri, options);
  }

  disconnect() {
    return this.db.disconnect();
  }

  _setModels() {
    const modelsDir = path.join(__dirname, 'models');

    filesHelper.getAllFilesInFolder(modelsDir).filter(mPath => !mPath.includes('factory.js')).forEach((mPath) => {
      const model = require(mPath);

      this.models[model.modelName] = model;
    });
  }

  convertToObjectId() {
    return mongoose.Types.ObjectId;
  }
}

module.exports = DbContext;