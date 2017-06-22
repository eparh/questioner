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

function createEmptyStub(methodName) {
  return createStub({
    methodName
  });
}

function createStubWithReturnValue(methodName, returnValue, resultToPromise = true) {
  return createStub({
    methodName,
    returnValue,
    resultToPromise
  });
}

function createStubWithParams(methodName, args) {
  return createStub({
    methodName,
    args
  });
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

function createMockWithParams(methodName, args) {
  return createMock({
    methodName,
    args
  });
}

module.exports = {
  createStub,
  createEmptyStub,
  createStubWithReturnValue,
  createStubWithParams,
  createMock,
  createMockWithParams
};