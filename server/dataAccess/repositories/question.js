'use strict';

const BaseRepository = require('./base');

class QuestionRepository extends BaseRepository {
  constructor({ dbContext }) {
    super(dbContext, 'Question');
  }

  getAll() {
    return this.find({}, '-answers');
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
    return this.Model.findOneAndUpdate({
      _id: questionId,
      'answers._id': answer._id
    },
    {
      $set: {
        'answers.$': answer
      }
    },
    {
      new: true
    });
  }

  removeAnswer(questionId, answerId) {
    return this.Model.findOneAndUpdate({
      _id: questionId
    },
    {
      $pull: {
        answers: {
          _id: answerId
        }
      }
    },
    {
      new: true
    });
  }

  voteUpQuestion(questionId, voterId) {
    const target = `voters.${voterId}`;

    return this.Model.findOneAndUpdate({
      _id: questionId
    },
    {
      $set: {
        [target]: 1
      }
    },
    {
      new: true
    }
    );
  }

  voteDownQuestion(questionId, voterId) {
    const target = `voters.${voterId}`;

    return this.Model.findOneAndUpdate({
      _id: questionId
    },
    {
      $set: {
        [target]: -1
      }
    },
    {
      new: true
    }
    );
  }

  voteUpAnswer(questionId, answerId, voterId) {
    const target = `answers.$.voters.${voterId}`;

    return this.Model.findOneAndUpdate({
      _id: questionId,
      'answers._id': answerId
    },
    {
      $set: {
        [target]: 1
      }
    },
    {
      new: true
    });
  }

  voteDownAnswer(questionId, answerId, voterId) {
    const target = `answers.$.voters.${voterId}`;

    return this.Model.findOneAndUpdate({
      _id: questionId,
      'answers._id': answerId
    },
    {
      $set: {
        [target]: -1
      }
    },
    {
      new: true
    });
  }
}

module.exports = QuestionRepository;