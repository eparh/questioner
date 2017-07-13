'use strict';

const routes = require('./data/routes.json');
const hooks = require('../helpers/hooks/integration');
const expect = require('chai').expect;
const initQueryConstructor = require('../helpers/utils/queryConstructor');
const { success, conflict, emptyResponse } = require('../../constants').STATUS_CODES;

const { userRepository, userService } = require('../../helpers/iocContainer').getAllDependencies();
const { clearCollections } = require('../helpers/database');
const login = require('../helpers/hooks/login');

const { testUser } = require('./data/user');
const cookie = require('cookie');
const Redis = require('ioredis');
const redis = new Redis();

const config = require('config');
const key = config.get('server.session-cookie');


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
    it('should register user', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.users.url}/register`,
        body: testUser,
        expect: success
      });

      expect(response.body.email).to.equal('test@gmail.com');
    });


    it('should not register user because he exists', async () => {
      await userService.register(testUser);

      await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.users.url}/register`,
        body: testUser,
        expect: conflict
      });
    });

    afterEach(clean);
  });

  describe('[POST] /users/login', () => {
    before(async () => {
      await userService.register(testUser);
    });

    it('should login', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.users.url}/login`,
        body: testUser,
        expect: success
      });

      expect(response.body.email).to.equal('test@gmail.com');
    });

    after(clean);
  });

  describe('[POST] /users/logout', () => {
    let cookies;
    let stringCookies;

    before(async () => {
      await userService.register(testUser);
      stringCookies = await login();

      cookies = cookie.parse(stringCookies);
    });

    it('should logout', async () => {
      await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.users.url}/logout`,
        expect: emptyResponse,
        headers: {
          cookie: stringCookies
        }
      });

      const result = JSON.parse(await redis.get(cookies[key]));

      return expect(result.passport).to.be.empty;
    });

    after(clean);
  });

  after(hooks.after);
});