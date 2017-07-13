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

  async getAnswerById(questionId, answerId) {
    const model = await this.Model.find({
      _id: questionId,
      'answers._id': answerId
    },
    {
      'answers.$': 1,
      _id: 0
    });
    const result = Object.assign(this.toJSON(model), [])[0];

    return result && result.answers[0];
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
          _id: answerId
        }
      }
    });
  }

  voteUpQuestion(questionId, voterId) {
    const target = `voters.${voterId}`;

    return this.Model.update({
      _id: questionId
    },
    {
      $set: {
        [target]: 1
      }
    }
    );
  }

  voteDownQuestion(questionId, voterId) {
    const target = `voters.${voterId}`;

    return this.Model.update({
      _id: questionId
    },
    {
      $set: {
        [target]: -1
      }
    }
    );
  }

  voteUpAnswer(questionId, answerId, voterId) {
    const target = `answers.$.voters.${voterId}`;

    return this.Model.update({
      _id: questionId,
      'answers._id': answerId
    },
    {
      $set: {
        [target]: 1
      }
    });
  }

  voteDownAnswer(questionId, answerId, voterId) {
    const target = `answers.$.voters.${voterId}`;

    return this.Model.update({
      _id: questionId,
      'answers._id': answerId
    },
    {
      $set: {
        [target]: -1
      }
    });
  }
}

module.exports = QuestionRepository;