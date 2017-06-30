'use strict';

const BaseRoute = require('./base');
const passport = require('passport');

class UserRoute extends BaseRoute {
  constructor({ userController }) {
    super(userController);
  }

  get(router) {
    const self = this;

    router.post('/register', self.registerHandler('register'));
    router.post('/login', passport.authenticate('local', {
      failureRedirect: '/login',
      successRedirect: '/questions'
    }));
    router.post('/logout', self.registerHandler('logout'));
  }

  getBaseUrl() {
    return '/users';
  }

}

module.exports = UserRoute;
