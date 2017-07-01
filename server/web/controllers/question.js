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
    const question = ctx.request.body;
    const files = ctx.req.files;

    return this.questionService.createQuestion(question, files);
  }

  updateQuestion(ctx) {
    const question = ctx.request.body;
    const files = ctx.req.files;

    return this.questionService.updateQuestion(question, files);
  }

  voteQuestion(ctx) {
    const { questionId, direction } = ctx.params;

    return this.questionService.voteQuestion(questionId, direction);
  }

  deleteQuestion(ctx) {
    const id = ctx.params.id;

    return this.questionService.deleteQuestion(id);
  }

  createAnswer(ctx) {
    const questionId = ctx.params.questionId;
    const answer = ctx.request.body;

    return this.questionService.createAnswer(questionId, answer);
  }

  updateAnswer(ctx) {
    const questionId = ctx.params.questionId;
    const answer = ctx.request.body;

    return this.questionService.updateAnswer(questionId, answer);
  }

  deleteAnswer(ctx) {
    const { questionId, answerId } = ctx.params;

    return this.questionService.deleteAnswer(questionId, answerId);
  }

  voteAnswer(ctx) {
    const { questionId, answerId, direction } = ctx.params;

    return this.questionService.voteAnswer(questionId, answerId, direction);
  }
}

module.exports = QuestionController;