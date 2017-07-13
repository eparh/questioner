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

  withTimeStamps(fieldDescription) {
    return Object.assign({}, fieldDescription, {
      timestamps: true
    });
  }

  includeVirtuals(fieldDescription) {
    return Object.assign({}, fieldDescription, {
      toObject: {
        virtuals: true
      },
      toJSON: {
        virtuals: true
      }
    });
  }

  unique(fieldDescription) {
    return Object.assign({}, fieldDescription, {
      unique: true
    });
  }

  lowercase(fieldDescription) {
    return Object.assign({}, fieldDescription, {
      lower: true
    });
  }

  trim(fieldDescription) {
    return Object.assign({}, fieldDescription, {
      trim: true
    });
  }

  withDefault(fieldDescription, value) {
    return Object.assign({}, fieldDescription, {
      default: value
    });
  }

  toEnum(fieldDescription, value) {
    return Object.assign({}, fieldDescription, {
      enum: value
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