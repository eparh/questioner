'use strict';

const routes = require('./data/routes.json');
const hooks = require('../helpers/hooks/integration');
const expect = require('chai').expect;
const initQueryConstructor = require('../helpers/utils/queryConstructor');
const statusCodes = require('../../constants').STATUS_CODES;

const { userRepository, userService } = require('../../helpers/iocContainer').getAllDependencies();
const { clearCollections } = require('../helpers/database');

const testData = require('./data/user');

function clean() {
  return clearCollections([userRepository.Model.modelName]);
}

describe('User API Test', () => {
  let app;
  let queryConstructor;

  before(async () => {
    app = await hooks.before();
    queryConstructor = initQueryConstructor(app);
  });

  describe('[POST] /users/register', () => {
    const { testUser } = testData;

    it('should register user', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.users.url}/register`,
        body: testUser,
        expect: statusCodes.success
      });

      expect(response.body.email).to.equal('test@gmail.com');
    });

    after(clean);
  });

  describe('[POST] /users/login', () => {
    const { testUser } = testData;

    before(async () => {
      await userService.register(testUser);
    });

    it('should login', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.users.url}/login`,
        body: testUser,
        expect: statusCodes.success
      });

      expect(response.body.email).to.equal('test@gmail.com');
    });

    after(clean);
  });

  describe('[POST] /users/logout', () => {
    it('should logout', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.users.url}/logout`,
        expect: statusCodes.emptyResponse
      });

      expect(response.headers).has.property('connection').that.equals('close');
    });

    after(clean);
  });

  after(hooks.after);
});