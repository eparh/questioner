'use strict';

const Router = require('koa-router');

const response = require('../../helpers/response');

class BaseRoute {
  constructor(controller) {
    this.controller = controller;
  }

  apply() {
    const self = this;
    const router = new Router();

    self.get(router);

    return (new Router()).use(self.getBaseUrl(), router.routes()).routes();
  }

  registerHandler(methodName, isAsync = true) {
    const { controller } = this;
    const handler = controller[methodName].bind(controller);

    if (isAsync) {
      return response.wrap(handler);
    } else {
      return handler;
    }
  }
}

module.exports = BaseRoute;