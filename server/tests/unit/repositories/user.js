'use strict';

const hooks = require('../../helpers/hooks/repository');
const generateTestsForBaseRepository = require('./base');

const { userRepository } = require('../../../helpers/iocContainer').getAllDependencies();

const { usersToCreate, userToCreate, userToUpdate } = require('./data/user');

describe('Tag Repository', () => {
  const testOpts = {
    repository: userRepository,
    data: {
      modelToCreate: userToCreate,
      modelsToCreate: usersToCreate,
      modelToUpdate: userToUpdate
    }
  };

  before(hooks.before);

  generateTestsForBaseRepository(testOpts);

  after(hooks.after);
});
