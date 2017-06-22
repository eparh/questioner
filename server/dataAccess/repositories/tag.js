'use strict';

const BaseRepository = require('./base');

class TagRepository extends BaseRepository {
  constructor({ dbContext }) {
    super(dbContext, 'Tag');
  }
}

module.exports = TagRepository;