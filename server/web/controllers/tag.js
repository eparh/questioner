'use strict';

class TagController {
  constructor({ tagService }) {
    this.tagService = tagService;
  }

  getAll() {
    return this.tagService.getAll();
  }

  createTag(ctx) {
    const tag = JSON.parse(ctx.request.tag);

    return this.tagService.createTag(tag);
  }

  updateTag(ctx) {
    const tag = JSON.parse(ctx.request.tag);

    return this.tagService.updateTag(tag);
  }

  deleteTag(ctx) {
    const id = ctx.params.id;

    return this.tagService.deleteTag(id);
  }
}

module.exports = TagController;