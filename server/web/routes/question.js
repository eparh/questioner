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

const passport = require('passport');


class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;

    router.get('/', passport.authenticationMiddleware(), self.registerHandler('getQuestions'));
    router.get('/tags/', passport.authenticationMiddleware(), validateTags, self.registerHandler('getQuestionsByTags'));
    router.get('/:id', passport.authenticationMiddleware(), validateIdParam, self.registerHandler('getQuestion'));
    router.post('/', passport.authenticationMiddleware(),
      validateQuestionCreateInfo, self.registerHandler('createQuestion'));
    router.put('/', passport.authenticationMiddleware(),
      validateQuestionUpdateInfo, self.registerHandler('updateQuestion'));

    router.put('/:questionId/answers', passport.authenticationMiddleware(),
      validateUpdateAnswerInfo, self.registerHandler('updateAnswer'));

    router.put('/:questionId/:direction', passport.authenticationMiddleware(),
      validateVoteQuestionInfo, self.registerHandler('voteQuestion'));
    router.delete('/:id', passport.authenticationMiddleware(), validateIdParam, self.registerHandler('deleteQuestion'));

    router.post('/:questionId/answers', passport.authenticationMiddleware(), validateCreateAnswerInfo,
      self.registerHandler('createAnswer'));
    router.delete('/:questionId/answers/:answerId', passport.authenticationMiddleware(),
      validateDeleteAnswer, self.registerHandler('deleteAnswer'));
    router.put('/:questionId/answers/:answerId/vote/:direction', passport.authenticationMiddleware(),
      validateVoteAnswerInfo, self.registerHandler('voteAnswer'));
  }

  getBaseUrl() {
    return '/questions';
  }
}

module.exports = QuestionRoute;
