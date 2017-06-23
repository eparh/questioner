'use strict';

/* eslint-disable no-empty-function */


class QuestionController {
  constructor({ questionService }) {
    this.questionService = questionService;
  }

  getQuestions() {
    return this.questionService.getAl();
  }

  getQuestionsWithAnswers() {
    return this.questionService.getQuestionsWithAnswers();
  }

  getQuestionsByTags(ctx) {
    const tags = ctx.params.tags;

    return this.questionService.getQuestionsByTags(tags);
  }

  createQuestion(ctx) {
    const question = JSON.parse(ctx.request.body.question);
    const attachments = ctx.req.attachments;

    return this.questionService.createQuestion(question, attachments);
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

  createTag(ctx) {
    const tag = JSON.parse(ctx.request.tag);

    return this.questionService.createTag(tag);
  }

  updateTag(ctx) {
    const tag = JSON.parse(ctx.request.tag);

    return this.questionService.updateTag(tag);
  }

  deleteTag(ctx) {
    const id = ctx.params.id;

    return this.questionService.deleteTag(id);
  }
}

module.exports = QuestionController;