'use strict';

class TagController {
  constructor({ tagService }) {
    this.tagService = tagService;
  }

  getAll() {
    return this.tagService.getAll();
  }

  create(ctx) {
    const tag = ctx.request.body;

    return this.tagService.create(tag);
  }

  update(ctx) {
    const tag = ctx.request.body;

    return this.tagService.update(tag);
  }

  delete(ctx) {
    const id = ctx.params.id;

    return this.tagService.delete(id);
  }
}

module.exports = TagController;