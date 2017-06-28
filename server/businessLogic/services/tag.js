'use strict';

class TagService {
  constructor({ tagRepository }) {
    this.tagRepository = tagRepository;
  }

  create(tag) {
    return this.tagRepository.create(tag);
  }

  update(tag) {
    return this.tagRepository.updateById(tag);
  }

  delete(id) {
    return this.tagRepository.removeById(id);
  }

  getAll() {
    return this.tagRepository.getAll();
  }
}

module.exports = TagService;