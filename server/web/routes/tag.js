'use strict';

const BaseRoute = require('./base');
const isAdmin = require('../../middlewares/security/isAdmin');

class TagRoute extends BaseRoute {
  constructor({ tagController }) {
    super(tagController);
  }

  get(router) {
    const self = this;

    router.get('/', isAdmin(), self.registerHandler('getAll'));
    router.post('/', isAdmin(), self.registerHandler('create'));
    router.put('/', isAdmin(), self.registerHandler('update'));
    router.delete('/:id', isAdmin(), self.registerHandler('delete'));
  }

  getBaseUrl() {
    return '/tags';
  }
}

module.exports = TagRoute;
