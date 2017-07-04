'use strict';

const sinon = require('sinon');

function _promisify(value, toPromise) {
  if (toPromise) {
    return Promise.resolve(value);
  } else {
    return value;
  }
}

function createStub({ methodName, returnValue = undefined, args = [], resultToPromise = true }) {
  if (!methodName) {
    throw new Error('Method name is not specified');
  }

  return {
    [methodName]: sinon.stub()
      .withArgs(...args)
      .returns(_promisify(returnValue, resultToPromise))
  };
}

function createMock({ methodName, returnValue = undefined, args = [], resultToPromise = true }) {
  if (!methodName) {
    throw new Error('Method name is not specified');
  }

  return {
    [methodName]: sinon.mock()
      .withArgs(...args)
      .returns(_promisify(returnValue, resultToPromise))
  };
}

function createSpy({ methodName }) {
  if (!methodName) {
    throw new Error('Method name is not specified');
  }

  return {
    [methodName]: sinon.mock()
  };
}

module.exports = {
  createStub,
  createMock,
  createSpy
};