'use strict';

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  logout(ctx) {
    ctx.logout();
    ctx.redirect('/');
  }

  register(ctx) {
    const formData = ctx.request.body;

    return this.userService.register(formData);
  }
}

module.exports = UserController;