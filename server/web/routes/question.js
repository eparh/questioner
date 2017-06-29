'use strict';

const BaseRoute = require('./base');

const validateQuestionCreateInfo = require('../../middlewares/validation/question/validateQuestionCreateInfo');
const validateQuestionUpdateInfo = require('../../middlewares/validation/question/validateQuestionUpdateInfo');
const validateIdParam = require('../../middlewares/validation/question/validateIdParam');
const validateTags = require('../../middlewares/validation/question/validateTags');
const validateUpdateAnswerInfo = require('../../middlewares/validation/question/validateUpdateAnswerInfo');
const validateCreateAnswerInfo = require('../../middlewares/validation/question/validateCreateAnswerInfo');
const validateVoteQuestionInfo = require('../../middlewares/validation/question/validateVoteQuestionInfo');
const validateVoteAnswerInfo = require('../../middlewares/validation/question/validateVoteAnswerInfo');
const validateDeleteAnswer = require('../../middlewares/validation/question/validateDeleteAnswer');


class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;

    router.get('/', self.registerHandler('getQuestions'));
    router.get('/tags/', validateTags, self.registerHandler('getQuestionsByTags'));
    router.get('/:id', validateIdParam, self.registerHandler('getQuestion'));
    router.post('/', validateQuestionCreateInfo, self.registerHandler('createQuestion'));
    router.put('/', validateQuestionUpdateInfo, self.registerHandler('updateQuestion'));

    router.put('/:questionId/answers', validateUpdateAnswerInfo, self.registerHandler('updateAnswer'));

    router.put('/:questionId/:direction', validateVoteQuestionInfo, self.registerHandler('voteQuestion'));
    router.delete('/:id', validateIdParam, self.registerHandler('deleteQuestion'));

    router.post('/:questionId/answers', validateCreateAnswerInfo, self.registerHandler('createAnswer'));
    router.delete('/:questionId/answers/:answerId', validateDeleteAnswer, self.registerHandler('deleteAnswer'));
    router.put('/:questionId/answers/:answerId/vote/:direction', validateVoteAnswerInfo, self.registerHandler('voteAnswer'));
  }

  getBaseUrl() {
    return '/questions';
  }
}

module.exports = QuestionRoute;
