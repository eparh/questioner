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
    const id = JSON.parse(ctx.request.tag);

    return this.userService.logout(id);
  }

  register(ctx) {
    const formData = JSON.parse(ctx.request.tag);

    return this.userService.register(formData);
  }
}

module.exports = UserController;