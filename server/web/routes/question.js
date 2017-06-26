'use strict';

const BaseRoute = require('./base');
// const auth = require('../../middlewares/security/auth');

class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;

    // const { validator } = self;
    router.get('/questions', self.registerHandler('getQuestions'));
    router.get('/questions/tags/:tag', self.registerHandler('getQuestions'));
    router.get('/questions/:id', self.registerHandler('getQuestion'));
    router.post('/questions/', self.registerHandler('createQuestion'));
    router.put('/questions/', self.registerHandler('updateQuestion'));
    router.put('/questions/vote/:direction', self.registerHandler('voteQuestion'));
    router.delete('/questions/:id', self.registerHandler('deleteQuestion'));

    router.post('/questions/:questionId/answer', self.registerHandler('createAnswer'));
    router.put('/questions/:questionId/answers/', self.registerHandler('updateAnswer'));
    router.delete('/questions/:questionId/answers/:answerId', self.registerHandler('deleteAnswer'));
    router.put('/questions/:questionId/answers/:answerId/vote/:direction', self.registerHandler('voteAnswer'));
    router.post('/tag', self.registerHandler('createTag'));
    router.put('/tag/', self.registerHandler('updateTag'));
    router.delete('/tag/:id', self.registerHandler('deleteTag'));
  }

  getBaseUrl() {
    return '/test';
  }
}

module.exports = QuestionRoute;
