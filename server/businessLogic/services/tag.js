'use strict';

class TagService {
  constructor({ tagRepository, mapper }) {
    this.tagRepository = tagRepository;
    this.mapper = mapper;
  }

  getById(id) {
    return this.tagRepository.getById(id);
  }

  create(tag) {
    const { mapper, tagRepository } = this;
    const tagModel = mapper(tag, 'mapCreateTag');

    return tagRepository.create(tagModel);
  }

  update(tag) {
    const { mapper, tagRepository } = this;
    const tagModel = mapper(tag, 'mapUpdateTag');

    return tagRepository.updateById(tagModel);
  }

  delete(id) {
    return this.tagRepository.removeById(id);
  }

  getAll() {
    return this.tagRepository.getAll();
  }
}

module.exports = TagService;