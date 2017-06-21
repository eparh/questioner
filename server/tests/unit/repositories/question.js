'use strict';

require('should');

const hooks = require('../../helpers/hooks/repository');
const generateTestsForBaseRepository = require('./base');
const { clearCollections } = require('../../helpers/database');

const { questionRepository } = require('../../../helpers/iocContainer').getAllDependencies();

const { questionsToCreate, questionToCreate, questionToUpdate } = require('./data/question');

/* eslint-disable no-unused-vars */

function cleanup() {
  return clearCollections([questionRepository.Model.modelName]);
}

describe('Question Repository', () => {
  const testOpts = {
    repository: questionRepository,
    data: {
      modelToCreate: questionToCreate,
      modelsToCreate: questionsToCreate,
      modelToUpdate: questionToUpdate
    }
  };

  before(hooks.before);

  generateTestsForBaseRepository(testOpts);
  after(hooks.after);
});
