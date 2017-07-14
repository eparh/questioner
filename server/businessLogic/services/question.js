'use strict';

const { conflict, forbidden, emptyResponse } = require('../../constants/').STATUS_CODES;

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

    if (! questionInDB) {
      return {
        statusCode: conflict
      };
    }

    return _hasPermission(user, questionInDB.author) ? questionRepository.updateById(questionModel) : {
      statusCode: forbidden
    };
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

    if (! questionInDB) {
      return {
        statusCode: conflict
      };
    }

    if (_hasPermission(user, questionInDB.author)) {
      questionRepository.removeById(id);
      return {
        statusCode: emptyResponse
      };
    }

    return {
      statusCode: forbidden
    };
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

    if (! answerInDB) {
      return {
        statusCode: conflict
      };
    }

    return _hasPermission(user, answerInDB.author) ? questionRepository.updateAnswer(questionId, answer) : {
      statusCode: forbidden
    };
  }

  async deleteAnswer(questionId, answerId, user) {
    const { questionRepository, _hasPermission } = this;
    const answerInDB = await questionRepository.getAnswerById(questionId, answerId);

    if (! answerInDB) {
      return {
        statusCode: conflict
      };
    }

    return _hasPermission(user, answerInDB.author) ? questionRepository.removeAnswer(questionId, answerId) : {
      statusCode: forbidden
    };
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