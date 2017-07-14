'use strict';

const expect = require('chai').expect;

const { mapper } = require('../../../helpers/iocContainer').getAllDependencies();
const { createStub, createMock } = require('../../helpers/utils/fakesHelper');
const { forbidden, emptyResponse } = require('../../../constants/').STATUS_CODES;

const {
  expectedQuestions, expectedQuestion, expectedQuestionsByTags, questionId, tag, tags, user, attachments, stranger,
  answer
} = require('./data/question');
const QuestionService = require('../../../businessLogic/services/question');

describe('Conference Service', () => {
  describe('getAll', () => {
    it('should get all', async () => {
      const questionRepository = createMock({
        methodName: 'getAll',
        returnValue: expectedQuestions
      });
      const service = new QuestionService({
        questionRepository
      });

      service.getAll();
      questionRepository.getAll.verify();
    });
  });

  describe('getById', async () => {
    it('should get by id', async () => {
      const questionRepository = createStub({
        methodName: 'getById',
        args: [questionId],
        returnValue: expectedQuestion
      });
      const service = new QuestionService({
        questionRepository
      });
      const question = await service.getById(questionId);

      expect(question).to.eql(expectedQuestion);
    });
  });

  describe('getByTags', async () => {
    it('should get by single tag', async () => {
      const questionRepository = createStub({
        methodName: 'getByTags',
        args: [[tag]],
        returnValue: expectedQuestionsByTags
      });
      const service = new QuestionService({
        questionRepository
      });
      const questions = await service.getByTags([tag]);

      expect(questions).to.eql(expectedQuestionsByTags);
    });

    it('should get by tags', async () => {
      const questionRepository = createStub({
        methodName: 'getByTags',
        args: [tags],
        returnValue: expectedQuestionsByTags
      });
      const service = new QuestionService({
        questionRepository
      });
      const questions = await service.getByTags(tags);

      expect(questions).to.eql(expectedQuestionsByTags);
    });
  });

  describe('createQuestion', () => {
    let questionRepository;
    let service;

    before(() => {
      questionRepository = createStub({
        methodName: 'create',
        returnValue: expectedQuestion
      });
      service = new QuestionService({
        questionRepository,
        mapper
      });
    });

    it('should create', async () => {
      const question = await service.createQuestion(expectedQuestion, attachments, user);

      expect(question).to.eql(expectedQuestion);
    });

    it('should create with empty attachments', async () => {
      const question = await service.createQuestion(expectedQuestion, [], user);

      expect(question).to.eql(expectedQuestion);
    });
  });

  describe('updateQuestion', () => {
    let questionRepository;
    let service;

    before(() => {
      questionRepository = Object.assign(
        createStub({
          methodName: 'updateById',
          returnValue: expectedQuestion
        }),
        createStub({
          methodName: 'findById',
          returnValue: expectedQuestion
        })
      );

      service = new QuestionService({
        questionRepository,
        mapper
      });
    });

    it('should update', async () => {
      const question = await service.updateQuestion(expectedQuestion, attachments, user);

      expect(question).to.eql(expectedQuestion);
    });

    it('should update with empty attachments', async () => {
      const question = await service.updateQuestion(expectedQuestion, [], user);

      expect(question).to.eql(expectedQuestion);
    });

    it('should not update because of forbiddance', async () => {
      const question = await service.updateQuestion(expectedQuestion, [], stranger);

      return expect(question).to.has.property('statusCode', forbidden);
    });
  });

  describe('voteUpQuestion', () => {
    it('should vote up', async () => {
      const questionRepository = createStub({
        methodName: 'voteUpQuestion',
        returnValue: expectedQuestion
      });
      const service = new QuestionService({
        questionRepository
      });

      const result = await service.voteUpQuestion(questionId);

      return expect(result).to.equal(expectedQuestion);
    });
  });

  describe('voteDownQuestion', () => {
    it('should vote down', async () => {
      const questionRepository = createStub({
        methodName: 'voteDownQuestion',
        returnValue: expectedQuestion
      });
      const service = new QuestionService({
        questionRepository
      });

      const result = await service.voteDownQuestion(questionId);

      return expect(result).to.equal(expectedQuestion);
    });
  });

  describe('deleteQuestion', () => {
    let service;

    beforeEach(() => {
      const questionRepository = Object.assign(
        createStub({
          methodName: 'removeById'
        }),
        createStub({
          methodName: 'findById',
          returnValue: expectedQuestion
        })
      );

      service = new QuestionService({
        questionRepository,
        mapper
      });
    });

    it('should delete', async () => {
      const result = await service.deleteQuestion(expectedQuestion._id, user);

      expect(result).to.eql({
        statusCode: emptyResponse
      });
    });

    it('should not delete because of forbiddance', async () => {
      const result = await service.deleteQuestion(expectedQuestion._id, stranger);

      expect(result).to.eql({
        statusCode: forbidden
      });
    });
  });

  describe('createAnswer', () => {
    it('should create', async () => {
      const questionRepository = createStub({
        methodName: 'addAnswer',
        returnValue: answer
      });
      const service = new QuestionService({
        questionRepository,
        mapper
      });

      const result = await service.createAnswer(expectedQuestion._id, answer, user);

      return expect(result).to.eql(result);
    });

  });

  describe('updateAnswer', () => {
    let questionRepository;
    let service;

    beforeEach(() => {
      questionRepository = Object.assign(
        createStub({
          methodName: 'updateAnswer',
          returnValue: answer
        }),
        createStub({
          methodName: 'getAnswerById',
          returnValue: answer
        })
      );

      service = new QuestionService({
        questionRepository,
        mapper
      });
    });

    it('should update', async () => {
      const result = await service.updateAnswer(expectedQuestion._id, answer, user);

      return expect(result).to.eql(answer);
    });

    it('should not update because of forbiddance', async () => {
      const result = await service.updateAnswer(expectedQuestion._id, answer, stranger);

      expect(result).to.eql({
        statusCode: forbidden
      });
    });
  });

  describe('deleteAnswer', () => {
    let questionRepository;
    let service;

    beforeEach(() => {
      questionRepository = Object.assign(
        createStub({
          methodName: 'removeAnswer',
          returnValue: {}
        }),
        createStub({
          methodName: 'getAnswerById',
          returnValue: answer
        })
      );

      service = new QuestionService({
        questionRepository,
        mapper
      });
    });

    it('should delete', async () => {
      const result = await service.deleteAnswer(questionId, answer._id, user);

      expect(result).to.be.eql({});
    });

    it('should not delete because of forbiddance', async () => {
      const result = await service.deleteAnswer(questionId, answer._id, stranger);

      expect(result).to.be.eql({
        statusCode: forbidden
      });
    });
  });

  describe('voteUpAnswer', () => {
    let service;

    before(() => {
      const questionRepository = createStub({
        methodName: 'voteUpAnswer',
        returnValue: answer
      });

      service = new QuestionService({
        questionRepository
      });
    });

    it('should vote up', async () => {
      const result = await service.voteUpAnswer(questionId, answer._id);

      expect(result).to.eql(answer);
    });
  });

  describe('voteDownAnswer', () => {
    let service;

    before(() => {
      const questionRepository = createStub({
        methodName: 'voteDownAnswer',
        returnValue: answer
      });

      service = new QuestionService({
        questionRepository
      });
    });

    it('should vote down', async () => {
      const result = await service.voteDownAnswer(questionId, answer._id);

      expect(result).to.eql(answer);
    });
  });
});
