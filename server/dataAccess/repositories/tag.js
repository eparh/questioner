'use strict';

const BaseRepository = require('./base');

class TagRepository extends BaseRepository {
  constructor({ dbContext }) {
    super(dbContext, 'Tag');
  }

  getAll() {
    return this.find({});
  }
}

module.exports = TagRepository;