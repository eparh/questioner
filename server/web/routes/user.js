'use strict';

const BaseRoute = require('./base');
const auth = require('../../middlewares/security/auth');

class UserRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }

  get(router) {
    const self = this;
    // const { validator } = self;

    router.post('/register', self.registerHandler('register'));
    router.post('/login', self.registerHandler('login'));
    router.post('/logout', auth, self.registerHandler('logout'));
  }

  getBaseUrl() {
    return '/';
  }

}

module.exports = UserRoute;
