'use strict';

const routes = require('./data/routes.json');
const hooks = require('../helpers/hooks/integration');
const expect = require('chai').expect;
const login = require('../helpers/hooks/login');
const initQueryConstructor = require('../helpers/utils/queryConstructor');
const queryString = require('query-string');
const filesHelper = require('../helpers/utils/filesHelper');
const { errorAuthTest, errorValidationTest } = require('../helpers/testTemplates');
const { success, emptyResponse, conflict, forbidden } = require('../../constants').STATUS_CODES;

const { questionRepository, userService } = require('../../helpers/iocContainer').getAllDependencies();
const { clearCollections } = require('../helpers/database');
const {
  questionToCreate, questionsToCreate, answer, fakeId, pathToAttaches, question
} = require('./data/question');
const { testUser } = require('./data/user');

function clean() {
  return clearCollections([questionRepository.Model.modelName]);
}

function checkQuestion(question, expected) {
  expect(question).to.have.property('title', expected.title);
  expect(question).to.have.property('description', expected.description);
  if (expected.answers && question.answers) {
    expect(question.answers).to.eql(expected.answers);
  }
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
    const errorAuthData = {
      method: 'get',
      text: 'should not get questions because not authorized',
      url: `${routes.questions.url}`
    };
    let createdQuestions;

    before(async () => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      errorAuthData.queryConstructor = queryConstructor;
      createdQuestions = await Promise.all(promises);
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

      const { body } = response;

      body.sort((a, b) => a._id > b._id);

      expect(body.length).to.equal(createdQuestions.length);
      body.forEach((question, index) => {
        checkQuestion(question, createdQuestions[index]);
      });
    });

    after(clean);
  });

  describe('[GET] /questions/:id', () => {
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

    it('should get a question', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/${questionId}`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      checkQuestion(response.body, resultQuestion);
    });

    it('should not get a question because of fake id', () => {
      queryConstructor.sendRequest({
        method: 'get',
        url: `${routes.questions.url}/${fakeId}`,
        expect: emptyResponse,
        headers: {
          cookie: cookies
        }
      });
    });

    after(clean);
  });

  describe('[GET] /questions/tags', () => {
    const errorAuthData = {
      method: 'get',
      text: 'should not get questions by tags because not authorized',
      url: `${routes.questions.url}/tags`
    };
    let tags;

    before(() => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      errorAuthData.queryConstructor = queryConstructor;
      tags = questionsToCreate[0].tags.map(tag => tag.toString());
      return Promise.all(promises);
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
    const errorAuthData = {
      method: 'post',
      text: 'should not create question because not authorized',
      url: `${routes.questions.url}`
    };
    const errorValidatiohData = {
      method: 'post',
      text: 'should not create question because of a validation failure',
      url: `${routes.questions.url}`
    };

    before(async () => {
      errorAuthData.queryConstructor = queryConstructor;
      Object.assign(errorValidatiohData, {
        queryConstructor,
        headers: {
          cookie: cookies
        }
      });
    });

    errorAuthTest(errorAuthData);
    errorValidationTest(errorValidatiohData);

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

      checkQuestion(response.body, questionToCreate);

      const result = await questionRepository.getById(response.body._id);

      checkQuestion(result, questionToCreate);
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

      checkQuestion(response.body, questionToCreate);

      const result = await questionRepository.getById(response.body._id);

      checkQuestion(result, questionToCreate);
    });

    after(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });
  });

  describe('[PUT] /questions/', () => {
    const errorAuthData = {
      method: 'put',
      text: 'should not update question because not authorized',
      url: `${routes.questions.url}`
    };
    const errorValidatiohData = {
      method: 'put',
      text: 'should not create question because of a validation failure',
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
      Object.assign(errorValidatiohData, {
        queryConstructor,
        headers: {
          cookie: cookies
        }
      });
    });

    errorAuthTest(errorAuthData);
    errorValidationTest(errorValidatiohData);

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

      checkQuestion(response.body, questionToCreate);

      const result = await questionRepository.getById(questionToCreate._id);

      checkQuestion(result, questionToCreate);
    });

    it('shouldn\'t update because question doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}`,
        expect: conflict,
        body: Object.assign({}, questionToCreate, {
          _id: fakeId
        }),
        headers: {
          cookie: cookies
        }
      });
    });

    it('shouldn\'t update because author doesn\'t math', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}`,
        expect: forbidden,
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
        method: 'put',
        url: `${routes.questions.url}`,
        expect: success,
        fields: [
          {
            name: '_id',
            value: questionToCreate._id.toString()
          },
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

      checkQuestion(response.body, questionToCreate);

      const result = await questionRepository.getById(questionToCreate._id);

      checkQuestion(result, questionToCreate);
    });

    after(() => {
      return Promise.all([
        clean(),
        filesHelper.cleanTestImagesDirectory()
      ]);
    });

  });

  describe('[PUT] /questions/:questionId/up', () => {
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

      expect(response.body.rating).to.equal(1);

      const result = await questionRepository.getById(questionId);

      expect(result.rating).to.equal(1);
    });

    it('shouldn\'t vote because question doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/up`,
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

  describe('[PUT] /questions/:questionId/down', () => {
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

      expect(response.body.rating).to.equal(-1);

      const result = await questionRepository.getById(questionId);

      expect(result.rating).to.equal(-1);
    });

    it('shouldn\'t vote because question doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/down`,
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

  describe('[DELETE] /questions/:id', () => {
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

    it('should delete question', () => {
      queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${questionId}`,
        expect: emptyResponse,
        headers: {
          cookie: cookies
        }
      });
    });

    it('shouldn\'t delete because question doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${fakeId}`,
        expect: conflict,
        headers: {
          cookie: cookies
        }
      });
    });

    it('shouldn\'t delete because author doesn\'t math', async () => {
      const otherCookie = await login();

      await queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${fakeId}`,
        expect: conflict,
        headers: {
          cookie: otherCookie
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
    let resultQuestion;
    let questionId;

    const errorAuthData = {
      method: 'post',
      text: 'should not create answer because not authorized'
    };

    const errorValidatiohData = {
      method: 'put',
      text: 'should not create question because of a validation failure',
      url: `${routes.questions.url}`
    };

    before(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);
      questionId = resultQuestion._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/answers`
      });
      Object.assign(errorValidatiohData, {
        queryConstructor,
        headers: {
          cookie: cookies
        },
        url: `${routes.questions.url}/${questionId}/answers`
      });
    });

    errorAuthTest(errorAuthData);
    errorValidationTest(errorValidatiohData);

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

      const resultAnswer = response.body.answers[0];

      expect(resultAnswer).to.include(answer);

      const result = await questionRepository.getAnswerById(questionId, resultAnswer._id);

      expect(resultAnswer.text).to.equal(result.text);
    });

    after(clean);
  });

  describe('[PUT] /:questionId/answers', () => {
    let resultQuestion;
    let questionId;
    const answerWithoutAuthor = {};

    Object.assign(answerWithoutAuthor, answer);

    const errorAuthData = {
      method: 'put',
      text: 'should not update answer because not authorized'
    };

    const errorValidatiohData = {
      method: 'put',
      text: 'should not update answer because of a validation failure'
    };

    before(async () => {
      resultQuestion = await questionRepository.create(questionToCreate);
      questionId = resultQuestion._id;
      answer.author = user._id;

      await questionRepository.addAnswer(questionId, answer);
      await questionRepository.addAnswer(questionId, answerWithoutAuthor);

      const { answers } = await questionRepository.getById(questionId);

      answer._id = answers[0]._id;
      answerWithoutAuthor._id = answers[1]._id;
      Object.assign(errorAuthData, {
        queryConstructor,
        url: `${routes.questions.url}/${questionId}/answers`
      });
      Object.assign(errorValidatiohData, {
        queryConstructor,
        headers: {
          cookie: cookies
        },
        url: `${routes.questions.url}/${questionId}/answers`
      });
    });

    errorAuthTest(errorAuthData);
    errorValidationTest(errorValidatiohData);

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

      const resultAnswer = response.body.answers[0];

      answer.author = answer.author.toString();
      answer._id = answer._id.toString();
      expect(resultAnswer).to.include(answer);

      const result = await questionRepository.getAnswerById(questionId, resultAnswer._id);

      expect(resultAnswer.text).to.equal(result.text);
    });

    it('shouldn\'t update because author doesn\'t match', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers`,
        expect: forbidden,
        body: answerWithoutAuthor,
        headers: {
          cookie: cookies
        }
      });
    });

    it('shouldn\'t update because answer doesn\'t exist', () => {
      const answerWithFakeId = Object.assign({}, answer, {
        _id: fakeId
      });

      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers`,
        body: answerWithFakeId,
        expect: conflict,
        headers: {
          cookie: cookies
        }
      });
    });

    after(clean);
  });

  describe('[DELETE] /:questionId/answers/:answerId', () => {
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

      expect(response.body.answers.length).to.equal(1);

      const result = await questionRepository.getAnswerById(questionId, answer._id);

      return expect(result).to.be.undefined;
    });

    it('shouldn\'t delete because author doesn\'t math', () => {
      queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${questionId}/answers/${answerWithoutAuthor._id}`,
        expect: forbidden,
        headers: {
          cookie: cookies
        }
      });
    });

    it('shouldn\'t delete because answer doensn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'delete',
        url: `${routes.questions.url}/${questionId}/answers/${fakeId}`,
        expect: conflict,
        headers: {
          cookie: cookies
        }
      });
    });
    after(clean);
  });

  describe('[PUT] /:questionId/answers/:answerId/vote/up', () => {
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

    it('should vote up answer', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}/vote/up`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.answers[0].rating).to.equal(1);

      const result = await questionRepository.getAnswerById(questionId, answer._id);

      expect(result.rating).to.equal(1);
    });

    it('shouldn\'t vote because question doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/answers/${answer._id}/vote/up`,
        expect: emptyResponse,
        headers: {
          cookie: cookies
        }
      });
    });

    it('shouldn\'t vote because answer doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${fakeId}/vote/up`,
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

  describe('[PUT] /:questionId/answers/:answerId/vote/down', () => {
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

    it('should vote down answer', async () => {
      const response = await queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${answer._id}/vote/down`,
        expect: success,
        headers: {
          cookie: cookies
        }
      });

      expect(response.body.answers[0].rating).to.equal(-1);

      const result = await questionRepository.getAnswerById(questionId, answer._id);

      expect(result.rating).to.equal(-1);
    });

    it('shouldn\'t vote because question doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${fakeId}/answers/${answer._id}/vote/down`,
        expect: emptyResponse,
        headers: {
          cookie: cookies
        }
      });
    });

    it('shouldn\'t vote because answer doesn\'t exist', () => {
      queryConstructor.sendRequest({
        method: 'put',
        url: `${routes.questions.url}/${questionId}/answers/${fakeId}/vote/down`,
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

  after(hooks.after);
});