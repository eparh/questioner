'use strict';

class QuestionService {
  constructor({ questionRepository }) {
    this.questionRepository = questionRepository;
  }
  getAll() {
    return this.questionRepository.getAll();
  }

  getQuestionsByTags(tags) {
    return this.questionRepository.getQuestionsByTags(tags);
  }

  createQuestion(question, attachments) {
    const now = new Date();
    const authorId = question.author;

    question.attachments = attachments;
    question.author = this.questionRepository.toObjectId(authorId);
    question.dateOfCreation = now;
    question.dateOfUpdate = now;
    return this.questionRepository.create(question);
  }

  updateQuestion(question, attachments) {

    return this.questionRepository.updateQuestion(question, attachments);
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