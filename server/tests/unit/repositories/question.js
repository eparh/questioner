'use strict';

const expect = require('chai').expect;

const hooks = require('../../helpers/hooks/repository');
const generateTestsForBaseRepository = require('./base');
const { clearCollections } = require('../../helpers/database');

const { questionRepository } = require('../../../helpers/iocContainer').getAllDependencies();

const { questionsToCreate, questionToCreate, questionToUpdate, answer } = require('./data/question');

/* eslint-disable no-empty-function */
/* eslint-disable no-magic-numbers */

function cleanup() {
  return clearCollections([questionRepository.Model.modelName]);
}

describe('Question Repository', () => {
  const testOpts = {
    repository: questionRepository,
    data: {
      modelToCreate: questionToCreate,
      modelsToCreate: questionsToCreate,
      modelToUpdate: questionToUpdate
    }
  };

  before(hooks.before);

  generateTestsForBaseRepository(testOpts);

  describe('#getAll', () => {
    before(async () => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      await Promise.all(promises);
    });

    it('should get all questions', async () => {
      const results = await questionRepository.getAll();
      const expectedLength = 3;

      expect(results).to.have.length(expectedLength);
    });
  });

  describe('#getByTags', () => {

  });

  describe('#getWithAnswers', () => {
    before(async () => {
      const promises = questionsToCreate.map(question => questionRepository.create(question));

      Promise.all(promises);
    });

    it('should get questions with answers', async () => {
      const results = await questionRepository.getWithAnswers();
      const expectedLength = 1;

      expect(results).to.have.length(expectedLength);
    });
  });

  describe('=Answers=', () => {
    let newQuestionId;
    let relatedAnswerId;

    beforeEach(async () => {
      const newQuestion = await questionRepository.create(questionToCreate);

      newQuestionId = newQuestion._id;
      relatedAnswerId = newQuestion.answers[0]._id;
    });

    describe('#addAnswer', () => {
      it('should add answer', async () => {
        await questionRepository.addAnswer(newQuestionId, answer);
        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion).to.have.property('answers').with.length(2);
        expect(updatedQuestion.answers[1]).to.deep.include(answer);
      });
    });

    describe('#updateAnswer', () => {
      it('should update answer', async () => {
        answer._id = relatedAnswerId;
        await questionRepository.updateAnswer(newQuestionId, answer);
        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion).to.have.property('answers').with.length(1);
        expect(updatedQuestion.answers[0]).to.deep.equal(answer);
      });
    });

    describe('#removeAnswer', () => {
      it('should delete answer', async () => {
        await questionRepository.removeAnswer(newQuestionId, relatedAnswerId);
        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion).to.have.property('answers').with.length(0);
      });
    });

    describe('#voteUpQuestion', () => {
      it('should vote up', async () => {
        await questionRepository.voteUpQuestion(newQuestionId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion).to.include({
          rating: 1
        });
      });
    });

    describe('#voteDownQuestion', () => {
      it('should vote down', async () => {
        await questionRepository.voteDownQuestion(newQuestionId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion).to.include({
          rating: -1
        });
      });
    });

    describe('#voteUpAnswer', () => {
      it('should vote down', async () => {
        await questionRepository.voteUpAnswer(newQuestionId, relatedAnswerId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion.answers[0]).to.include({
          rating: 1
        });
      });
    });

    describe('#voteDownAnswer', () => {
      it('should vote down', async () => {
        await questionRepository.voteDownAnswer(newQuestionId, relatedAnswerId);

        const updatedQuestion = await questionRepository.findById(newQuestionId);

        expect(updatedQuestion.answers[0]).to.include({
          rating: -1
        });
      });
    });
  });

  afterEach(cleanup);
  after(hooks.after);
});
