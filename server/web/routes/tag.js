'use strict';

const BaseRoute = require('./base');
const isAdmin = require('../../middlewares/security/isAdmin');
const validateCreateTagInfo = require('../validators/tag/validateCreateTagInfo');
const validateUpdateTagInfo = require('../validators/tag/validateUpdateTagInfo');
const validateDeleteTagInfo = require('../validators/tag/validateDeleteTagInfo');
const passport = require('passport');

class TagRoute extends BaseRoute {
  constructor({ tagController }) {
    super(tagController);
  }

  get(router) {
    const self = this;
    const { validator } = self;

    router.get('/', passport.authenticationMiddleware(), self.registerHandler('getAll'));
    router.post('/', isAdmin, validator(validateCreateTagInfo), self.registerHandler('create'));
    router.put('/', isAdmin, validator(validateUpdateTagInfo), self.registerHandler('update'));
    router.delete('/:id', isAdmin, validator(validateDeleteTagInfo), self.registerHandler('delete'));
  }

  getBaseUrl() {
    return '/tags';
  }
}

module.exports = TagRoute;
