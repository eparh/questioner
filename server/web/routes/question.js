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
const multer = require('../../middlewares/fileUploading/multer')();

class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;
    const { validator } = self;

    router.use(passport.authenticationMiddleware());

    router.get('/', self.registerHandler('getQuestions'));
    router.get('/tags/', validator(validateTags), self.registerHandler('getQuestionsByTags'));
    router.get('/:id', validator(validateIdParam), self.registerHandler('getQuestion'));

    router.post('/', multer.array('attachments'),
      validator(validateQuestionCreateInfo), self.registerHandler('createQuestion'));

    router.put('/', multer.array('attachments'),
      validator(validateQuestionUpdateInfo), self.registerHandler('updateQuestion'));

    router.put('/:questionId/answers', validator(validateUpdateAnswerInfo), self.registerHandler('updateAnswer'));

    router.put('/:questionId/up', validator(validateVoteQuestionInfo), self.registerHandler('voteUpQuestion'));

    router.put('/:questionId/down', validator(validateVoteQuestionInfo), self.registerHandler('voteDownQuestion'));

    router.delete('/:id', validator(validateIdParam), self.registerHandler('deleteQuestion'));


    router.post('/:questionId/answers', validator(validateCreateAnswerInfo), self.registerHandler('createAnswer'));

    router.delete('/:questionId/answers/:answerId',
      validator(validateDeleteAnswer), self.registerHandler('deleteAnswer'));

    router.put('/:questionId/answers/:answerId/vote/up',
      validator(validateVoteAnswerInfo), self.registerHandler('voteUpAnswer'));

    router.put('/:questionId/answers/:answerId/vote/down',
      validator(validateVoteAnswerInfo), self.registerHandler('voteDownAnswer'));
  }

  getBaseUrl() {
    return '/questions';
  }
}

module.exports = QuestionRoute;
