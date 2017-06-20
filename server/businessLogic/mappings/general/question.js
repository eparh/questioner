'use strict';

const QuestionDTO = require('../../models/conference/questionDTO');

module.exports = (mapper) => {
  mapper.register(mapper.SNAKE_CASE_CONVENTION, 'questDTOToDAL', QuestionDTO, Object, (mapping) => {
    mapping.convert((questionInfo) => {
      return {
        rating: questionInfo.rating,
        author: mapper.userDTOToDAL(questionInfo.author),
        title: questionInfo.title,
        description: questionInfo.description,
        tags: questionInfo.tags,
        dateOfCreation: questionInfo.dateOfCreation,
        // TO-DO  attachments : questionInfo.attachments
        dateOfUpdate: questionInfo.dateOfUpdate,
        answer: mapper.answerDTOToDAL(questionInfo.answer)
      };
    });
  });
};