'use strict';

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  login(ctx) {
    const credentials = JSON.parse(ctx.request.credentials);

    return this.userService.login(credentials);
  }

  logout(ctx) {
    const id = JSON.parse(ctx.request.id);

    return this.userService.logout(id);
  }

  register(ctx) {
    const formData = ctx.request.body;

    return this.userService.register(formData);
  }
}

module.exports = UserController;