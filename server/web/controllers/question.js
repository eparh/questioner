'use strict';

class QuestionController {
  constructor({ questionService }) {
    this.questionService = questionService;
  }
}

module.exports = QuestionController;