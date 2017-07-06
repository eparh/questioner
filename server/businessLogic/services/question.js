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

  getByTags(tags) {
    const tagsArray = Array.isArray(tags) ? tags : [tags];

    return this.questionRepository.getByTags(tagsArray);
  }

  createQuestion(question, attachments, user) {
    const { mapper, questionRepository } = this;
    const filePaths = attachments.map(file => file.path);
    const questionModel = mapper(question, 'mapCreateQuestion');

    questionModel.author = user._id;
    questionModel.attachments = filePaths || [];

    return questionRepository.create(questionModel);
  }

  async updateQuestion(question, attachments, user) {
    const { mapper, questionRepository, _hasPermission } = this;
    const questionModel = mapper(question, 'mapUpdateQuestion');
    const filePaths = attachments.map(file => file.path);

    questionModel.attachments = filePaths;

    const questionInDB = await questionRepository.findById(questionModel._id);

    if (_hasPermission(user, questionInDB)) {
      return questionRepository.updateById(questionModel);
    }
  }

  voteUpQuestion(questionId, voterId) {
    return this.questionRepository.voteUpQuestion(questionId, voterId);
  }

  voteDownQuestion(questionId, voterId) {
    return this.questionRepository.voteDownQuestion(questionId, voterId);
  }

  async deleteQuestion(id, user) {
    const { questionRepository, _hasPermission } = this;
    const questionInDB = await questionRepository.findById(id);

    if (_hasPermission(user, questionInDB)) {
      return questionRepository.removeById(id);
    } else {
      return;
    }
  }

  createAnswer(questionId, answer, user) {
    const { mapper, questionRepository } = this;
    const answerModel = mapper(answer, 'mapCreateAnswer');

    answerModel.author = user._id;
    return questionRepository.addAnswer(questionId, answerModel);
  }

  async updateAnswer(questionId, answer, user) {
    const { questionRepository, _hasPermission } = this;
    const answerInDB = (await questionRepository.getAnswerById(questionId, answer._id) || [])[0];

    if (_hasPermission(user, answerInDB)) {
      return questionRepository.updateAnswer(questionId, answer);
    } else {
      return;
    }
  }

  async deleteAnswer(questionId, answerId, user) {
    const { questionRepository, _hasPermission } = this;
    const answerInDB = (await questionRepository.getAnswerById(questionId, answerId) || [])[0];

    if (_hasPermission(user, answerInDB)) {
      return this.questionRepository.removeAnswer(questionId, answerId);
    } else {
      return;
    }
  }

  voteDownAnswer(questionId, answerId, voterId) {
    return this.questionRepository.voteDownAnswer(questionId, answerId, voterId);
  }

  voteUpAnswer(questionId, answerId, voterId) {
    return this.questionRepository.voteUpAnswer(questionId, answerId, voterId);
  }

  _hasPermission(user, record) {
    return user.role === 'admin' || user._id.equals(record.author);
  }
}

module.exports = QuestionService;