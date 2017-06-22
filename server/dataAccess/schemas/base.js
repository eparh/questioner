'use strict';

const mongoose = require('mongoose');

class BaseSchema {
  constructor() {
    this.Schema = mongoose.Schema;
  }

  ofType(type) {
    return {
      type
    };
  }

  objectRef(ref) {
    return Object.assign({}, {
      ref,
      type: mongoose.Schema.ObjectId
    });
  }

  withDefault(fieldDescription, value) {
    return Object.assign({}, fieldDescription, {
      default: value
    });
  }

  required(fieldDescription) {
    return Object.assign({}, fieldDescription, {
      required: true
    });
  }

  setIndex(fieldDescription, opts) {
    return Object.assign({}, fieldDescription, {
      index: opts
    });
  }
}

module.exports = BaseSchema;