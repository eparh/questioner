'use strict';


module.exports = (ctx) => {
  if (ctx.req.body) {
    ctx.request.body = ctx.req.body;
  }
  ctx.checkBody('title').notEmpty();
  ctx.checkBody('description').notEmpty();
  ctx.checkBody('tags').optional();
  ctx.checkBody('attachments').optional();
};


