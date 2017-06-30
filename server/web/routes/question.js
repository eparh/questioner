'use strict';

const BaseRoute = require('./base');

const validateQuestionCreateInfo = require('../validators/question/validateQuestionCreateInfo');
const validateQuestionUpdateInfo = require('../validators/question/validateQuestionUpdateInfo');
const validateIdParam = require('../validators/question/validateIdParam');
const validateTags = require('../validators/question/validateTags');
const validateUpdateAnswerInfo = require('../validators/question/validateUpdateAnswerInfo');
const validateCreateAnswerInfo = require('../validators/question/validateCreateAnswerInfo');
const validateVoteQuestionInfo = require('../validators/question/validateVoteQuestionInfo');
const validateVoteAnswerInfo = require('../validators/question/validateVoteAnswerInfo');
const validateDeleteAnswer = require('../validators/question/validateDeleteAnswer');
const passport = require('passport');


class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;
    const { validator } = self;

    router.get('/', passport.authenticationMiddleware(), self.registerHandler('getQuestions'));

    router.get('/tags/', passport.authenticationMiddleware(),
      validator(validateTags), self.registerHandler('getQuestionsByTags'));

    router.get('/:id', passport.authenticationMiddleware(),
      validator(validateIdParam), self.registerHandler('getQuestion'));

    router.post('/', passport.authenticationMiddleware(),
      validator(validateQuestionCreateInfo), self.registerHandler('createQuestion'));

    router.put('/', passport.authenticationMiddleware(),
      validator(validateQuestionUpdateInfo), self.registerHandler('updateQuestion'));

    router.put('/:questionId/answers', passport.authenticationMiddleware(),
      validator(validateUpdateAnswerInfo), self.registerHandler('updateAnswer'));

    router.put('/:questionId/:direction', passport.authenticationMiddleware(),
      validator(validateVoteQuestionInfo), self.registerHandler('voteQuestion'));
    router.delete('/:id', passport.authenticationMiddleware(),
      validator(validateIdParam), self.registerHandler('deleteQuestion'));


    router.post('/:questionId/answers', passport.authenticationMiddleware(),
      validator(validateCreateAnswerInfo), self.registerHandler('createAnswer'));

    router.delete('/:questionId/answers/:answerId', passport.authenticationMiddleware(),
      validator(validateDeleteAnswer), self.registerHandler('deleteAnswer'));

    router.put('/:questionId/answers/:answerId/vote/:direction', passport.authenticationMiddleware(),
      validator(validateVoteAnswerInfo), self.registerHandler('voteAnswer'));
  }

  getBaseUrl() {
    return '/questions';
  }
}

module.exports = QuestionRoute;
