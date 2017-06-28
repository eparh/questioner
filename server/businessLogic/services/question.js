'use strict';

class QuestionService {
  constructor({ questionRepository, mapper }) {
    this.questionRepository = questionRepository;
    this.mapper = mapper;
  }
  getAll() {
    return this.questionRepository.getAll();
  }

  getById(id) {
    return this.questionRepository.getById(id);
  }

  getByTags(income) {
    let tags = income;

    if (!Array.isArray(income)) {
      tags = [];
      tags.push(income);
    }

    return this.questionRepository.getByTags(tags);
  }

  createQuestion(question, attachments) {
    const { mapper, questionRepository } = this;
    const questionModel = mapper(question, 'mapCreateQuestion');

    return questionRepository.create(questionModel, attachments);
  }

  updateQuestion(question, attachments) {
    const { mapper, questionRepository } = this;
    const questionModel = mapper(question, 'mapUpdateQuestion');

    return questionRepository.updateById(questionModel, attachments);
  }

  voteQuestion(questionId, direction) {
    switch (direction) {
      case 'up':
        return this.questionRepository.voteUpQuestion(questionId);
      case 'down':
        return this.questionRepository.voteDownQuestion(questionId);
      default: return;
    }
  }

  deleteQuestion(id) {

    return this.questionRepository.removeById(id);
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