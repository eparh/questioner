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
    router.get('/', self.registerHandler('getQuestions'));
    router.get('/tags/:tag', self.registerHandler('getQuestions'));
    router.get('/:id', self.registerHandler('getQuestion'));
    router.post('/', self.registerHandler('createQuestion'));
    router.put('/', self.registerHandler('updateQuestion'));
    router.put('/:questionId/:direction', self.registerHandler('voteQuestion'));
    router.delete('/:id', self.registerHandler('deleteQuestion'));

    router.post('/:questionId/answer', self.registerHandler('createAnswer'));
    router.put('/:questionId/answers/', self.registerHandler('updateAnswer'));
    router.delete('/:questionId/answers/:answerId', self.registerHandler('deleteAnswer'));
    router.put('/:questionId/answers/:answerId/vote/:direction', self.registerHandler('voteAnswer'));
  }

  getBaseUrl() {
    return '/questions';
  }
}

module.exports = QuestionRoute;
