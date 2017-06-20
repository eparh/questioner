'use strict';

const BaseRepository = require('./base');

class QuestionRepository extends BaseRepository {
  constructor({dbContext}) {
    super(dbContext, 'Question');
  }
}