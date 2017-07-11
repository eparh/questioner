'use strict';

const BaseRepository = require('./base');

class UserRepository extends BaseRepository {
  constructor({ dbContext }) {
    super(dbContext, 'User');
  }
}

module.exports = UserRepository;