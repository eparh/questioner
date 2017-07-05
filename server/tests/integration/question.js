'use strict';

const routes = require('./data/routes.json');
const hooks = require('../helpers/hooks/integration');
const expect = require('chai').expect;
const login = require('../helpers/hooks/login');
const initQueryConstructor = require('../helpers/utils/queryConstructor');

// const filesHelper = require('../helpers/utils/filesHelper');
const statusCodes = require('../../constants').STATUS_CODES;

const { questionRepository, userService } = require('../../helpers/iocContainer').getAllDependencies();
const { clearCollections } = require('../helpers/database');

const testData = require('./data/question');
const { testUser } = require('./data/user');

function clean() {
  return clearCollections([questionRepository.Model.modelName]);
}

describe('Question API Test', () => {
  let app;
  let cookies;
  let queryConstructor;

  before(async () => {
    app = await hooks.before();
    queryConstructor = initQueryConstructor(app);
    await userService.register(testUser);
    cookies = await login();
  });

  describe('[GET] /questions/', () => {
    const { questionsToCreate } = testData;

    beforeEach(async () => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      await Promise.all(promises);
    });

    it('should get questions', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}`,
        expect: statusCodes.success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.length).to.eql(questionsToCreate.length);
    });

    it('should not get questions', async () => {
      await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}`,
        expect: 302
      });
    });

    afterEach(clean);
  });

  describe('[POST] /questions/', () => {
    const { questionToCreate } = testData;

    it('should create question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}`,
        expect: statusCodes.success,
        body: questionToCreate,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.description).to.eql(questionToCreate.description);
    });

    it('should not create question', async () => {
      await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}`,
        expect: 302
      });
    });

    afterEach(clean);
  });

  after(hooks.after);
});