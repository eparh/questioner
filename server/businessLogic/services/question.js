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
    const { mapper, questionRepository } = this;
    const answerModel = mapper(answer, 'mapCreateAnswer');

    return questionRepository.addAnswer(questionId, answerModel);
  }

  updateAnswer(questionId, answer) {

    return this.questionRepository.updateAnswer(questionId, answer);
  }

  deleteAnswer(questionId, answerId) {

    return this.questionRepository.removeAnswer(questionId, answerId);
  }

  voteAnswer(questionId, answerId, direction) {
    switch (direction) {
      case 'up':
        return this.questionRepository.voteUpAnswer(questionId, answerId);
      case 'down':
        return this.questionRepository.voteDownAnswer(questionId, answerId);
      default: return;
    }
  }
}

module.exports = QuestionService;