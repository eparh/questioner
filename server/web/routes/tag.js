'use strict';

const BaseRoute = require('./base');
// const auth = require('../../middlewares/security/auth');

class TagRoute extends BaseRoute {
  constructor({ tagController }) {
    super(tagController);
  }

  get(router) {
    const self = this;

    router.get('/', self.registerHandler('getAll'));
    router.post('/', self.registerHandler('create'));
    router.put('/', self.registerHandler('update'));
    router.delete('/:id', self.registerHandler('delete'));
  }

  getBaseUrl() {
    return '/tags';
  }
}

module.exports = TagRoute;
