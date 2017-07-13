'use strict';

const { conflict } = require('../../constants/').STATUS_CODES;

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
    const files = ctx.req.files || [];
    const userId = ctx.state.user._id;

    return this.questionService.createQuestion(question, files, userId);
  }

  async updateQuestion(ctx) {
    const question = ctx.request.body;
    const files = ctx.req.files || [];
    const user = ctx.state.user;
    const result = await this.questionService.updateQuestion(question, files, user);

    return result ? this.questionService.getById(question._id) : {
      statusCode: conflict
    };
  }

  async voteUpQuestion(ctx) {
    const { questionId } = ctx.params;
    const voterId = ctx.state.user._id;
    const result = await this.questionService.voteUpQuestion(questionId, voterId);

    return result.nModified ? this.questionService.getById(questionId) : {
      statusCode: conflict
    };
  }

  async voteDownQuestion(ctx) {
    const { questionId } = ctx.params;
    const voterId = ctx.state.user._id;

    const result = await this.questionService.voteDownQuestion(questionId, voterId);

    return result.nModified ? this.questionService.getById(questionId) : {
      statusCode: conflict
    };
  }

  async deleteQuestion(ctx) {
    const id = ctx.params.id;
    const user = ctx.state.user;
    const result = await this.questionService.deleteQuestion(id, user);

    if (! result) {
      return {
        statusCode: conflict
      };
    }
  }

  createAnswer(ctx) {
    const questionId = ctx.params.questionId;
    const answer = ctx.request.body;
    const userId = ctx.state.user._id;

    return this.questionService.createAnswer(questionId, answer, userId);
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

  voteUpAnswer(ctx) {
    const { questionId, answerId } = ctx.params;
    const voterId = ctx.state.user._id;

    return this.questionService.voteUpAnswer(questionId, answerId, voterId);
  }

  voteDownAnswer(ctx) {
    const { questionId, answerId } = ctx.params;
    const voterId = ctx.state.user._id;

    return this.questionService.voteDownAnswer(questionId, answerId, voterId);
  }
}

module.exports = QuestionController;