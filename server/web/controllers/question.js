'use strict';

class QuestionController {
  constructor({ questionService }) {
    this.questionService = questionService;
  }

  getQuestion(ctx) {
    const id = ctx.params.id;

    return this.questionService.getById(id);
  }

  getQuestions() {
    return this.questionService.getAll();
  }

  getQuestionsByTags(ctx) {
    const tags = ctx.query.tags;

    return this.questionService.getByTags(tags);
  }

  createQuestion(ctx) {
    const question = ctx.request.body.fields;
    const files = ctx.req.files;
    const user = ctx.state.user;

    return this.questionService.createQuestion(question, files, user);
  }

  updateQuestion(ctx) {
    const question = ctx.request.body.fields;
    const files = ctx.req.files;
    const user = ctx.state.user;

    return this.questionService.updateQuestion(question, files, user);
  }

  voteQuestion(ctx) {
    const { questionId, direction } = ctx.params;

    return this.questionService.voteQuestion(questionId, direction);
  }

  deleteQuestion(ctx) {
    const id = ctx.params.id;
    const user = ctx.state.user;

    return this.questionService.deleteQuestion(id, user);
  }

  createAnswer(ctx) {
    const questionId = ctx.params.questionId;
    const answer = ctx.request.body.fields;
    const user = ctx.state.user;

    return this.questionService.createAnswer(questionId, answer, user);
  }

  updateAnswer(ctx) {
    const questionId = ctx.params.questionId;
    const answer = ctx.request.body;
    const user = ctx.state.user;

    return this.questionService.updateAnswer(questionId, answer, user);
  }

  deleteAnswer(ctx) {
    const { questionId, answerId } = ctx.params;
    const user = ctx.state.user;

    return this.questionService.deleteAnswer(questionId, answerId, user);
  }

  voteAnswer(ctx) {
    const { questionId, answerId, direction } = ctx.params;

    return this.questionService.voteAnswer(questionId, answerId, direction);
  }
}

module.exports = QuestionController;