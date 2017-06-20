'use strict';

class QuestionDTO {
  constructor() {
    this.author = undefined;
    this.rating = undefined;
    this.title = undefined;
    this.decription = undefined;
    this.tags = undefined;
    this.dateOfCreation = undefined;
    this.dateOfUpdate = undefined;
    this.attachments = undefined;
  }
}

module.exports = QuestionDTO;