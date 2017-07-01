'use strict';

const BaseRoute = require('./base');
const isAdmin = require('../../middlewares/security/isAdmin');
const validateCreateTagInfo = require('../validators/tag/validateCreateTagInfo');
const validateUpdateTagInfo = require('../validators/tag/validateUpdateTagInfo');
const validateDeleteTagInfo = require('../validators/tag/validateDeleteTagInfo');

class TagRoute extends BaseRoute {
  constructor({ tagController }) {
    super(tagController);
  }

  get(router) {
    const self = this;
    const { validator } = self;

    router.use(isAdmin());

    router.get('/', self.registerHandler('getAll'));
    router.post('/', validator(validateCreateTagInfo), self.registerHandler('create'));
    router.put('/', validator(validateUpdateTagInfo), self.registerHandler('update'));
    router.delete('/:id', validator(validateDeleteTagInfo), self.registerHandler('delete'));
  }

  getBaseUrl() {
    return '/tags';
  }
}

module.exports = TagRoute;
