'use strict';

const BaseRoute = require('./base');

class QuestionRoute extends BaseRoute {
  constructor({ questionController }) {
    super(questionController);
  }
}

module.exports = QuestionRoute;
