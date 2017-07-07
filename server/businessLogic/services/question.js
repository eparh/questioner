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

  createQuestion(question, attachments, userId) {
    const { mapper, questionRepository } = this;
    const filePaths = attachments.map(file => file.path);
    const questionModel = mapper(question, 'mapCreateQuestion');

    questionModel.author = userId;
    questionModel.attachments = filePaths;

    return questionRepository.create(questionModel);
  }

  async updateQuestion(question, attachments, user) {
    const { mapper, questionRepository, _hasPermission } = this;
    const questionModel = mapper(question, 'mapUpdateQuestion');
    const filePaths = attachments.map(file => file.path);

    questionModel.attachments = filePaths;

    const questionInDB = await questionRepository.findById(questionModel._id);

    if (questionInDB && _hasPermission(user, questionInDB.author)) {
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

    if (questionInDB && _hasPermission(user, questionInDB.author)) {
      return questionRepository.removeById(id);
    }
  }

  createAnswer(questionId, answer, userId) {
    const { mapper, questionRepository } = this;
    const answerModel = mapper(answer, 'mapCreateAnswer');

    answerModel.author = userId;
    return questionRepository.addAnswer(questionId, answerModel);
  }

  async updateAnswer(questionId, answer, user) {
    const { questionRepository, _hasPermission } = this;
    const answerInDB = await questionRepository.getAnswerById(questionId, answer._id);

    if (answerInDB && _hasPermission(user, answerInDB.author)) {
      return questionRepository.updateAnswer(questionId, answer);
    }
  }

  async deleteAnswer(questionId, answerId, user) {
    const { questionRepository, _hasPermission } = this;
    const answerInDB = await questionRepository.getAnswerById(questionId, answerId);

    if (answerInDB && _hasPermission(user, answerInDB.author )) {
      return this.questionRepository.removeAnswer(questionId, answerId);
    }
  }

  voteDownAnswer(questionId, answerId, voterId) {
    return this.questionRepository.voteDownAnswer(questionId, answerId, voterId);
  }

  voteUpAnswer(questionId, answerId, voterId) {
    return this.questionRepository.voteUpAnswer(questionId, answerId, voterId);
  }

  _hasPermission(user, author) {
    return user.role === 'admin' || user._id.equals(author);
  }
}

module.exports = QuestionService;