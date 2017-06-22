'use strict';

const hooks = require('../../helpers/hooks/repository');
const generateTestsForBaseRepository = require('./base');

const { tagRepository } = require('../../../helpers/iocContainer').getAllDependencies();

const { tagsToCreate, tagToCreate, tagToUpdate } = require('./data/tag');


describe('Tag Repository', () => {
  const testOpts = {
    repository: tagRepository,
    data: {
      modelToCreate: tagToCreate,
      modelsToCreate: tagsToCreate,
      modelToUpdate: tagToUpdate
    }
  };

  before(hooks.before);

  generateTestsForBaseRepository(testOpts);

  after(hooks.after);
});
