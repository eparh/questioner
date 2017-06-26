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
    const tags = ctx.params.tags;

    return this.questionService.getQuestionsByTags(tags);
  }

  createQuestion(ctx) {
    const question = ctx.request.body;
    // const attachments = ctx.req.attachments;

    return this.questionService.createQuestion(question, []);
  }

  updateQuestion(ctx) {
    const question = JSON.parse(ctx.request.body.question);
    const attachments = ctx.req.attachments;

    return this.questionService.updateQuestion(question, attachments);
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
    const answer = JSON.parse(ctx.request.answer);

    return this.questionService.createAnswer(questionId, answer);
  }

  updateAnswer(ctx) {
    const questionId = ctx.params.questionId;
    const answer = JSON.parse(ctx.request.answer);

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