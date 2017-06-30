'use strict';

const BaseRoute = require('./base');
const passport = require('passport');
const validateLoginInfo = require('../validators/user/validateLoginInfo');
const validateRegisterInfo = require('../validators/user/validateRegisterInfo');

class UserRoute extends BaseRoute {
  constructor({ userController }) {
    super(userController);
  }

  get(router) {
    const self = this;
    const { validator } = self;

    router.post('/register', validator(validateRegisterInfo), self.registerHandler('register'));
    router.post('/login', validator(validateLoginInfo), passport.authenticate('local', {
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
