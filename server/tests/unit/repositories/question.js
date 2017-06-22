'use strict';

const expect = require('chai').expect;

const hooks = require('../../helpers/hooks/repository');
const generateTestsForBaseRepository = require('./base');
const { clearCollections } = require('../../helpers/database');

const { questionRepository } = require('../../../helpers/iocContainer').getAllDependencies();

const { questionsToCreate, questionToCreate, questionToUpdate, answer, expectedAnswerText } = require('./data/question');

/* eslint-disable no-empty-function */

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

      Promise.all(promises);
    });

    it('should get all questions', async () => {
      const results = await questionRepository.getAll();
      const expectedLength = 3;

      expect(results).to.have.length(expectedLength);
    });

    after(cleanup);
  });

  describe('#getByTags', () => {

    after(cleanup);
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

    after(cleanup);
  });

  describe('=Answers=', () => {
    describe('#addAnswer', () => {
      let newQustionId;

      before(async () => {
        const newQuestion = await questionRepository.create(questionToCreate);

        newQustionId = newQuestion._id;
      });

      it('should add answer', async () => {
        await questionRepository.addAnswer(newQustionId, answer);
        const updatedQuestion = await questionRepository.findById(newQustionId);

        expect(updatedQuestion).to.have.property('answers').with.length(2);
        expect(updatedQuestion.answers[1]).to.deep.include(answer);
      });

      after(cleanup);
    });

    describe('#updateAnswer', () => {
      let newQustionId;
      let relatedAnswerId;

      before(async () => {
        const newQuestion = await questionRepository.create(questionToCreate);

        newQustionId = newQuestion._id;
        relatedAnswerId = newQuestion.answers[0]._id;
      });

      it('should update answer', async () => {
        answer._id = relatedAnswerId;
        await questionRepository.updateAnswer(newQustionId, answer);
        const updatedQuestion = await questionRepository.findById(newQustionId);

        expect(updatedQuestion).to.have.property('answers').with.length(1);
        expect(updatedQuestion.answers[0]).to.deep.equal(answer);
      });

      after(cleanup);
    });

    describe('#removeAnswer', () => {
      let newQustionId;
      let relatedAnswerId;

      before(async () => {
        const newQuestion = await questionRepository.create(questionToCreate);

        newQustionId = newQuestion._id;
        relatedAnswerId = newQuestion.answers[0]._id;
      });

      it('should delete answer', async () => {
        await questionRepository.removeAnswer(newQustionId, relatedAnswerId);
        const updatedQuestion = await questionRepository.findById(newQustionId);

        expect(updatedQuestion).to.have.property('answers').with.length(0);
      });

      after(cleanup);
    });
  });


  after(hooks.after);
});
