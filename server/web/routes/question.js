'use strict';

const BaseRoute = require('./base');
const auth = require('../../middlewares/security/auth');

class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;

    // const { validator } = self;

    router.get('/questions', auth, self.registerHandler('getQuestions'));
    router.post('/question', auth, self.registerHandler('createQuestion'));
    router.post('/answer', auth, self.registerHandler('createAnswer'));
    router.put('/question', auth, self.registerHandler('createQuestion'));
    router.put('/answer', auth, self.registerHandler('createAnswer'));
    router.delete('/question', auth, self.registerHandler('deleteQuestion'));
    router.delete('/answer', auth, self.registerHandler('createAnswer'));
    router.put('/question/vote/:direction', auth, self.registerHandler('voteQuestion'));
    router.put('/answer/vote/:direction', auth, self.registerHandler('voteAnswer'));
    router.post('/tag', auth, self.registerHandler('createTag'));
    router.put('/tag', auth, self.registerHandler('updateTag'));
    router.delete('/tag', auth, self.registerHandler('deleteTag'));
  }

  getBaseUrl() {
    return '/';
  }

}

module.exports = QuestionRoute;
