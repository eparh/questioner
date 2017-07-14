'use strict';

const { conflict } = require('../../constants/').STATUS_CODES;

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

  async update(ctx) {
    const tag = ctx.request.body;

    return this.tagService.update(tag);
  }

  async delete(ctx) {
    const id = ctx.params.id;
    const res = await this.tagService.delete(id);

    if (!res.result.n) {
      return {
        statusCode: conflict
      };
    }
  }
}

module.exports = TagController;