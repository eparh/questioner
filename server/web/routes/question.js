'use strict';

const BaseRoute = require('./base');
// const auth = require('../../middlewares/security/auth');
const auth = {};

class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;

    // const { validator } = self;

    router.get('/questions', auth, self.registerHandler('getQuestions'));
    router.get('/questions/tags/:tag', auth, self.registerHandler('getQuestions'));
    router.get('/questions-with-answers', auth, self.registerHandler('getQuestionWithAnswers'));
    router.get('/questions/:id', auth, self.registerHandler('getQuestion'));
    router.post('/questions/', auth, self.registerHandler('createQuestion'));
    router.put('/questions/', auth, self.registerHandler('updateQuestion'));
    router.put('/questions/vote/:direction', auth, self.registerHandler('voteQuestion'));
    router.delete('/questions/:id', auth, self.registerHandler('deleteQuestion'));

    router.post('/questions/:questionId/answer', auth, self.registerHandler('createAnswer'));
    router.put('/questions/:questionId/answers/', auth, self.registerHandler('updateAnswer'));
    router.delete('/questions/:questionId/answers/:answerId', auth, self.registerHandler('deleteAnswer'));
    router.put('/questions/:questionId/answers/:answerId/vote/:direction', auth, self.registerHandler('voteAnswer'));
    router.post('/tag', auth, self.registerHandler('createTag'));
    router.put('/tag/', auth, self.registerHandler('updateTag'));
    router.delete('/tag/:id', auth, self.registerHandler('deleteTag'));
  }
}

module.exports = QuestionRoute;
