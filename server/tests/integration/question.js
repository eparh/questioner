'use strict';

const routes = require('./data/routes.json');
const hooks = require('../helpers/hooks/integration');
const expect = require('chai').expect;
const login = require('../helpers/hooks/login');
const initQueryConstructor = require('../helpers/utils/queryConstructor');
const queryString = require('query-string');
const filesHelper = require('../helpers/utils/filesHelper');
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

  describe('[GET] /questions/:id', () => {
    const { questionToCreate } = testData;
    let questionId;
    let resultQuestion;

    beforeEach(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);

      questionId = resultQuestion._id;
    });

    it('should get questions', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/${questionId}`,
        expect: statusCodes.success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body).to.have.property('description', resultQuestion.description);
    });

    it('should not get question', async () => {
      await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}`,
        expect: 302
      });
    });

    afterEach(clean);
  });

  describe('[GET] /questions/tags', () => {
    const { questionsToCreate } = testData;
    let tagQuery;

    before(async () => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      await Promise.all(promises);

      const tags = questionsToCreate[0].tags.map(tag => tag.toString());

      tagQuery = queryString.stringify({
        tags
      });
    });

    it('should get questions', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/tags?${tagQuery}`,
        expect: statusCodes.success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body).to.be.an('array').that.has.length(1);
    });

    it('should not get questions', async () => {
      await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/tags?${tagQuery}`,
        expect: 302
      });
    });

    afterEach(clean);
  });

  describe('[POST] /questions/', () => {
    const { questionToCreate, pathToAttaches } = testData;

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

      expect(response.body.description).to.equal(questionToCreate.description);
    });

    it('should create question with attachments', async () => {
      const attachments = [
        `${pathToAttaches}/image.jpg`,
        `${pathToAttaches}/img2.jpg`
      ];
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}`,
        expect: statusCodes.success,
        fields: [
          {
            name: 'title',
            value: questionToCreate.title
          },
          {
            name: 'description',
            value: questionToCreate.description
          },
          {
            name: 'rating',
            value: questionToCreate.rating
          }
        ],
        headers: {
          cookie: cookies
        },
        attachments
      });

      expect(response.body).to.has.property('description');
    });

    it('should not create question', async () => {
      await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}`,
        expect: 302
      });
    });

    after(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe.skip('[PUT] /questions/', () => {
    const { questionToCreate, pathToAttaches } = testData;

    let resultQuestion;
    let questionId;

    beforeEach(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);

      questionId = resultQuestion._id;
    });

    it('should update question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}`,
        expect: statusCodes.success,
        body: questionToCreate,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.description).to.equal(questionToCreate.description);
    });

    it('should update question with attachments', async () => {
      const attachments = [
        `${pathToAttaches}/image.jpg`,
        `${pathToAttaches}/img2.jpg`
      ];
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}`,
        expect: statusCodes.success,
        fields: [
          {
            name: 'title',
            value: questionToCreate.title
          },
          {
            name: 'description',
            value: questionToCreate.description
          },
          {
            name: 'rating',
            value: questionToCreate.rating
          }
        ],
        headers: {
          cookie: cookies
        },
        attachments
      });

      expect(response.body).to.has.property('description');
    });

    it('should not update question', async () => {
      await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}`,
        expect: 302
      });
    });

    after(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  after(hooks.after);
});