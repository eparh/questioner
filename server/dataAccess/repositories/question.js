'use strict';

const BaseRepository = require('./base');

class QuestionRepository extends BaseRepository {
  constructor({ dbContext }) {
    super(dbContext, 'Question');
  }

  getAll() {
    return this.find({}, '-answers');
  }

  getById(id) {
    return this.findById(id);
  }

  getByTags(tags) {
    return this.find({
      tags: {
        $elemMatch: {
          $in: tags
        }
      }
    });
  }

  getWithAnswers() {
    return this.find({
      answers: {
        $gt: []
      }
    });
  }

  addAnswer(questionId, answer) {
    return this.Model.update(
      {
        _id: questionId
      },
      {
        $push: {
          answers: answer
        }
      }
    );
  }

  updateAnswer(questionId, answer) {
    return this.Model.update({
      _id: questionId,
      'answers._id': answer._id
    },
    {
      $set: {
        'answers.$': answer
      }
    });
  }

  removeAnswer(questionId, answerId) {
    return this.Model.update({
      _id: questionId
    },
    {
      $pull: {
        answers: {
          id: answerId
        }
      }
    });
  }

  voteUpQuestion(questionId) {
    return this.Model.update({
      _id: questionId
    },
    {
      $inc: {
        rating: 1
      }
    });
  }

  voteDownQuestion(questionId) {
    return this.Model.update({
      _id: questionId
    },
    {
      $inc: {
        rating: -1
      }
    });
  }

  voteUpAnswer(questionId, answerId) {
    return this.Model.update({
      _id: questionId,
      'answers._id': answerId
    },
    {
      $inc: {
        'answers.$.rating': 1
      }
    });
  }

  voteDownAnswer(questionId, answerId) {
    return this.Model.update({
      _id: questionId,
      'answers._id': answerId
    },
    {
      $inc: {
        'answers.$.rating': -1
      }
    });
  }

}

module.exports = QuestionRepository;