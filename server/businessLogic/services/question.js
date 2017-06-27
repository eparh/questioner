'use strict';

const mapper = require('../../helpers/mapper');


class QuestionService {
  constructor({ questionRepository }) {
    this.questionRepository = questionRepository;
    // this.mapper = mapper;
  }
  getAll() {
    return this.questionRepository.getAll();
  }

  getQuestionsByTags(tags) {
    return this.questionRepository.getQuestionsByTags(tags);
  }

  createQuestion(question, attachments) {
    const questionModel = mapper(question, 'mapCreateQuestion');

    return this.questionRepository.create(questionModel, attachments);
  }

  updateQuestion(question, attachments) {
    const questionModel = mapper(question, 'mapUpdateQuestion');

    return this.questionRepository.updateById(questionModel, attachments);
  }

  voteQuestion(questionId, direction) {

    return this.questionRepository.voteQuestion(questionId, direction);
  }

  deleteQuestion(id) {

    return this.questionRepository.deleteQuestion(id);
  }

  createAnswer(questionId, answer) {

    return this.questionRepository.createAnswer(questionId, answer);
  }

  updateAnswer(questionId, answer) {

    return this.questionRepository.updateAnswer(questionId, answer);
  }

  deleteAnswer(questionId, answerId) {

    return this.questionRepository.deleteAnswer(questionId, answerId);
  }

  voteAnswer(questionId, answerId, direction) {

    return this.questionRepository.voteAnswer(questionId, answerId, direction);
  }
}

module.exports = QuestionService;