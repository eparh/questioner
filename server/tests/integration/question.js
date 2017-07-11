'use strict';

const routes = require('./data/routes.json');
const hooks = require('../helpers/hooks/integration');
const expect = require('chai').expect;
const login = require('../helpers/hooks/login');
const initQueryConstructor = require('../helpers/utils/queryConstructor');
const queryString = require('query-string');
const filesHelper = require('../helpers/utils/filesHelper');
const { errorAuthTest } = require('../helpers/testTemplates');
const { success, emptyResponse } = require('../../constants').STATUS_CODES;

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
  let user;

  before(async () => {
    app = await hooks.before();
    queryConstructor = initQueryConstructor(app);
    user = await userService.register(testUser);
    cookies = await login();
  });

  describe('[GET] /questions/', () => {
    const { questionsToCreate } = testData;
    const errorAuthData = {
      method: 'get',
      text: 'should not get questions because not authorized',
      url: `${routes.questions.url}`
    };

    before(async () => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      errorAuthData.queryConstructor = queryConstructor;
      await Promise.all(promises);
    });


    errorAuthTest(errorAuthData);

    it('should get questions', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.length).to.equal(questionsToCreate.length);
    });

    after(clean);
  });

  describe('[GET] /questions/:id', () => {
    const { questionToCreate } = testData;
    let questionId;
    let resultQuestion;
    const errorAuthData = {
      method: 'get',
      text: 'should not get question by Id because not authorized'
    };

    before(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);
      errorAuthData.queryConstructor = queryConstructor;
      questionId = resultQuestion._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}`
      });
    });

    errorAuthTest(errorAuthData);

    it('should get question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/${questionId}`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body).to.have.property('description', resultQuestion.description);
    });

    after(clean);
  });

  describe('[GET] /questions/tags', () => {
    const { questionsToCreate } = testData;
    const errorAuthData = {
      method: 'get',
      text: 'should not get questions by tags because not authorized',
      url: `${routes.questions.url}/tags`
    };
    let tags;

    before(async () => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      errorAuthData.queryConstructor = queryConstructor;
      await Promise.all(promises);
      tags = questionsToCreate[0].tags.map(tag => tag.toString());
    });

    errorAuthTest(errorAuthData);

    it('should get questions by tags', async () => {
      const tagQuery = queryString.stringify({
        tags
      });

      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/tags?${tagQuery}`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body).to.be.an('array').that.has.length(1);
    });

    it('should get questions by tag', async () => {
      const tagQuery = queryString.stringify({
        tags: tags[1]
      });

      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/tags?${tagQuery}`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body).to.be.an('array').that.has.length(1);
    });

    after(clean);
  });

  describe('[POST] /questions/', () => {
    const { questionToCreate, pathToAttaches } = testData;
    const errorAuthData = {
      method: 'post',
      text: 'should not create question because not authorized',
      url: `${routes.questions.url}`
    };

    before(async () => {
      errorAuthData.queryConstructor = queryConstructor;
    });

    errorAuthTest(errorAuthData);

    it('should create question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}`,
        expect: success,
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
        expect: success,
        fields: [
          {
            name: 'title',
            value: questionToCreate.title
          },
          {
            name: 'description',
            value: questionToCreate.description
          }
        ],
        headers: {
          cookie: cookies
        },
        attachments
      });

      expect(response.body).to.has.property('description');
    });

    after(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe('[PUT] /questions/', () => {
    const { questionToCreate, pathToAttaches, fakeId, question } = testData;
    const errorAuthData = {
      method: 'put',
      text: 'should not update question because not authorized',
      url: `${routes.questions.url}`
    };

    let resultQuestion;

    before(async () => {
      questionToCreate.author = user;
      resultQuestion = await questionRepository.create(questionToCreate);
      questionToCreate._id = resultQuestion._id;

      resultQuestion = await questionRepository.create(question);
      question._id = resultQuestion._id;

      errorAuthData.queryConstructor = queryConstructor;
    });

    errorAuthTest(errorAuthData);

    it('should update question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}`,
        expect: success,
        body: questionToCreate,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    it('shouldn\'t update because question doensn\'t exist', async () => {
      questionToCreate._id = fakeId;

      await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}`,
        expect: emptyResponse,
        body: questionToCreate,
        headers: {
          cookie: cookies
        }
      });

    });

    it('shouldn\'t update because author doensn\'t math', async () => {
      before(async () => {
        resultQuestion = await questionRepository.create(question);
        question._id = resultQuestion._id;
      });

      await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}`,
        expect: emptyResponse,
        body: question,
        headers: {
          cookie: cookies
        }
      });

    });

    it('should update question with attachments', async () => {
      const attachments = [
        `${pathToAttaches}/image.jpg`,
        `${pathToAttaches}/img2.jpg`
      ];
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}`,
        expect: success,
        fields: [
          {
            name: 'title',
            value: questionToCreate.title
          },
          {
            name: 'description',
            value: questionToCreate.description
          }
        ],
        headers: {
          cookie: cookies
        },
        attachments
      });

      expect(response.body).to.has.property('description');
    });

    after(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe('[PUT] /questions/:questionId/up', () => {
    const { fakeId, question } = testData;
    const errorAuthData = {
      method: 'put',
      text: 'should not vote up question because not authorized'
    };
    let resultQuestion;
    let questionId;

    beforeEach(async () => {
      resultQuestion = await questionRepository.create(question);
      questionId = resultQuestion._id;

      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/up`
      });
    });

    errorAuthTest(errorAuthData);

    it('should vote up question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/up`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    it('shouldn\'t vote because question doensn\'t exist', async () => {

      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/up`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(0);
    });

    afterEach(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe('[PUT] /questions/:questionId/down', () => {
    const { fakeId, question } = testData;
    const errorAuthData = {
      method: 'put',
      text: 'should not vote down question because not authorized'
    };
    let resultQuestion;
    let questionId;

    beforeEach(async () => {
      resultQuestion = await questionRepository.create(question);
      questionId = resultQuestion._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/down`
      });
    });

    errorAuthTest(errorAuthData);

    it('should vote down question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/down`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    it('shouldn\'t vote because question doensn\'t exist', async () => {

      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/down`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(0);
    });

    afterEach(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe('[DELETE] /questions/:id', () => {
    const { fakeId, question } = testData;
    const errorAuthData = {
      method: 'delete',
      text: 'should not delete question because not authorized'
    };

    let questionId;

    beforeEach(async () => {
      question.author = user;
      const resultQuestion = await questionRepository.create(question);

      questionId = resultQuestion._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}`
      });
    });

    errorAuthTest(errorAuthData);

    it('should delete question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${questionId}`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.n).to.equal(1);
    });

    it('shouldn\'t delete because question doensn\'t exist', async () => {
      await queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${fakeId}`,
        expect: emptyResponse,
        headers: {
          cookie: cookies
        }
      });
    });

    afterEach(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe('[POST] /:questionId/answers', () => {
    const { questionToCreate, answer } = testData;

    let resultQuestion;
    let questionId;

    const errorAuthData = {
      method: 'post',
      text: 'should not create answer because not authorized'
    };

    before(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);
      questionId = resultQuestion._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/answers`
      });
    });

    errorAuthTest(errorAuthData);

    it('should create answer', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'post',
        url: `${routes.questions.url}/${questionId}/answers`,
        expect: success,
        body: answer,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    after(clean);
  });

  describe('[PUT] /:questionId/answers', () => {
    const { questionToCreate, answer } = testData;

    let resultQuestion;
    let questionId;
    const answerWithoutAuthor = {};

    Object.assign(answerWithoutAuthor, answer);

    const errorAuthData = {
      method: 'put',
      text: 'should not update answer because not authorized'
    };

    before(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);
      questionId = resultQuestion._id;
      answer.author = user;

      await questionRepository.addAnswer(questionId, answer);
      await questionRepository.addAnswer(questionId, answerWithoutAuthor);

      const { answers } = await questionRepository.getById(questionId);

      answer._id = answers[0]._id;
      answerWithoutAuthor._id = answers[1]._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/answers`
      });
    });

    errorAuthTest(errorAuthData);

    it('should update answer', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers`,
        expect: success,
        body: answer,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    it('shouldn\'t update because author doensn\'t math', async () => {
      await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers`,
        expect: emptyResponse,
        body: answerWithoutAuthor,
        headers: {
          cookie: cookies
        }
      });

    });

    after(clean);
  });

  describe('[DELETE] /:questionId/answers/:answerId', () => {
    const { questionToCreate, answer, fakeId } = testData;

    let resultQuestion;
    let questionId;
    const answerWithoutAuthor = {};

    Object.assign(answerWithoutAuthor, answer);

    const errorAuthData = {
      method: 'delete',
      text: 'should not delete answer because not authorized'
    };

    before(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);
      questionId = resultQuestion._id;
      answer.author = user;

      await questionRepository.addAnswer(questionId, answer);
      await questionRepository.addAnswer(questionId, answerWithoutAuthor);

      const { answers } = await questionRepository.getById(questionId);

      answer._id = answers[0]._id;
      answerWithoutAuthor._id = answers[1]._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}`
      });
    });

    errorAuthTest(errorAuthData);

    it('should delete answer', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    it('shouldn\'t delete because author doensn\'t math', async () => {
      await queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${questionId}/answers/${answerWithoutAuthor._id}`,
        expect: emptyResponse,
        headers: {
          cookie: cookies
        }
      });

      it('shouldn\'t delete because answer doensn\'t exist', async () => {
        await queryConstructor.sendRequest({
          method: 'delete',
          url: `${routes.questions.url}/answers/${fakeId}`,
          expect: emptyResponse,
          headers: {
            cookie: cookies
          }
        });
      });

    });

    after(clean);
  });

  describe('[PUT] /:questionId/answers/:answerId/vote/up', () => {
    const { fakeId, question, answer } = testData;
    const errorAuthData = {
      method: 'put',
      text: 'should not vote up answer because not authorized'
    };
    let resultQuestion;
    let questionId;

    beforeEach(async () => {
      resultQuestion = await questionRepository.create(question);
      questionId = resultQuestion._id;

      await questionRepository.addAnswer(questionId, answer);
      const { answers } = await questionRepository.getById(questionId);

      answer._id = answers[0]._id;

      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}/vote/up`
      });
    });

    errorAuthTest(errorAuthData);

    it('should vote up question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}/vote/up`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    it('shouldn\'t vote because question doensn\'t exist', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/answers/${answer._id}/vote/up`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(0);
    });

    it('shouldn\'t vote because answer doensn\'t exist', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${fakeId}/vote/up`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(0);
    });

    afterEach(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe('[PUT] /:questionId/answers/:answerId/vote/down', () => {
    const { fakeId, question, answer } = testData;
    const errorAuthData = {
      method: 'put',
      text: 'should not vote down answer because not authorized'
    };
    let resultQuestion;
    let questionId;

    beforeEach(async () => {
      resultQuestion = await questionRepository.create(question);
      questionId = resultQuestion._id;

      await questionRepository.addAnswer(questionId, answer);
      const { answers } = await questionRepository.getById(questionId);

      answer._id = answers[0]._id;

      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}/vote/down`
      });
    });

    errorAuthTest(errorAuthData);

    it('should vote up question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}/vote/down`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(1);
    });

    it('shouldn\'t vote because question doensn\'t exist', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/answers/${answer._id}/vote/down`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(0);
    });

    it('shouldn\'t vote because answer doensn\'t exist', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${fakeId}/vote/down`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.nModified).to.equal(0);
    });

    afterEach(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  after(hooks.after);
});