'use strict';

const expect = require('chai').expect;

const { mapper } = require('../../../helpers/iocContainer').getAllDependencies();
const { createStub, createMock, createSpy } = require('../../helpers/utils/fakesHelper');
const { forbidden } = require('../../../constants/').STATUS_CODES;

const testData = require('./data/question');
const QuestionService = require('../../../businessLogic/services/question');

describe('Conference Service', () => {
  describe('getAll', () => {
    it('should get all', async () => {
      const { expectedQuestions } = testData;
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
      const { expectedQuestion, questionId } = testData;
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
      const { expectedQuestionsByTags, tag } = testData;
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
      const { expectedQuestionsByTags, tags } = testData;
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
    const { expectedQuestion, user, attachments } = testData;

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
    const { expectedQuestion, user, attachments } = testData;

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
      const question = await service.updateQuestion(expectedQuestion, [], testData.stranger);

      return expect(question).to.has.property('statusCode', forbidden);
    });
  });

  describe('voteUpQuestion', () => {
    const { questionId } = testData;

    it('should vote up', async () => {
      const questionRepository = createSpy({
        methodName: 'voteUpQuestion'
      });
      const service = new QuestionService({
        questionRepository
      });

      service.voteUpQuestion(questionId);
      const result = questionRepository.voteUpQuestion.called;

      return expect(result).to.be.true;
    });
  });

  describe('voteDownQuestion', () => {
    const { questionId } = testData;

    it('should vote down', async () => {
      const questionRepository = createSpy({
        methodName: 'voteDownQuestion'
      });
      const service = new QuestionService({
        questionRepository
      });

      service.voteDownQuestion(questionId);
      const result = questionRepository.voteDownQuestion.called;

      return expect(result).to.be.true;
    });
  });

  describe('deleteQuestion', () => {
    const { expectedQuestion, user, stranger } = testData;

    it('should delete', async () => {
      const questionRepository = Object.assign(
        createSpy({
          methodName: 'removeById'
        }),
        createStub({
          methodName: 'findById',
          returnValue: expectedQuestion
        })
      );

      const service = new QuestionService({
        questionRepository,
        mapper
      });

      await service.deleteQuestion(expectedQuestion._id, user);
      const result = questionRepository.removeById.called;

      return expect(result).true;
    });

    it('should not delete because of forbiddance', async () => {
      const questionRepository = Object.assign(
        createSpy({
          methodName: 'removeById'
        }),
        createStub({
          methodName: 'findById',
          returnValue: expectedQuestion
        })
      );

      const service = new QuestionService({
        questionRepository,
        mapper
      });

      await service.deleteQuestion(expectedQuestion._id, stranger);
      const result = questionRepository.removeById.called;

      return expect(result).false;
    });
  });

  describe('createAnswer', () => {
    it('should create', async () => {
      const { user, answer, expectedQuestion } = testData;
      const questionRepository = createStub({
        methodName: 'addAnswer'
      });
      const service = new QuestionService({
        questionRepository,
        mapper
      });

      await service.createAnswer(expectedQuestion._id, answer, user);
      const result = questionRepository.addAnswer.called;

      return expect(result).true;
    });

  });

  describe('updateAnswer', () => {
    let questionRepository;
    let service;
    const { expectedQuestion, user, answer, stranger } = testData;

    beforeEach(() => {
      questionRepository = Object.assign(
        createSpy({
          methodName: 'updateAnswer'
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
      await service.updateAnswer(expectedQuestion._id, answer, user);

      const result = questionRepository.updateAnswer.called;

      return expect(result).true;
    });

    it('should not update because of forbiddance', async () => {
      await service.updateAnswer(expectedQuestion._id, answer, stranger);

      const result = questionRepository.updateAnswer.called;

      return expect(result).false;
    });
  });

  describe('deleteAnswer', () => {
    let questionRepository;
    let service;
    const { questionId, user, answer, stranger } = testData;

    beforeEach(() => {
      questionRepository = Object.assign(
        createSpy({
          methodName: 'removeAnswer'
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
      await service.deleteAnswer(questionId, answer._id, user);

      const result = questionRepository.removeAnswer.called;

      return expect(result).true;
    });

    it('should not delete because of forbiddance', async () => {
      await service.deleteAnswer(questionId, answer._id, stranger);

      const result = questionRepository.removeAnswer.called;

      return expect(result).false;
    });
  });

  describe('voteAnswer', () => {
    const { questionId, answer } = testData;

    it('should vote up', async () => {
      const questionRepository = createSpy({
        methodName: 'voteUpAnswer'
      });
      const service = new QuestionService({
        questionRepository
      });

      service.voteUpAnswer(questionId, answer._id);
      const result = questionRepository.voteUpAnswer.called;

      return expect(result).to.be.true;
    });

    it('should vote down', async () => {
      const questionRepository = createSpy({
        methodName: 'voteDownAnswer'
      });
      const service = new QuestionService({
        questionRepository
      });

      service.voteDownAnswer(questionId, answer._id);
      const result = questionRepository.voteDownAnswer.called;

      return expect(result).to.be.true;
    });

  });
});
