'use strict';

class QuestionService {
  constructor({ questionRepository, tagRepository }) {
    this.questionRepository = questionRepository;
    this.tagRepository = tagRepository;
  }
  getAll() {
    return this.questionRepository.getAll();
  }

  getQuestionsByTags(tags) {
    return this.questionRepository.getQuestionsByTags(tags);
  }

  createQuestion(question, attachments) {
    return this.questionRepository.createQuestion(question, attachments);
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

  createTag(tag) {

    return this.tagRepository.createTag(tag);
  }

  updateTag(tag) {

    return this.tagRepository.updateTag(tag);
  }

  deleteTag(id) {

    return this.tagRepository.deleteTag(id);
  }
}

module.exports = QuestionService;