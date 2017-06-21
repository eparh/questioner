'use strict';

const AnswerDTO = require('../../models/general/answerDTO');

module.exports = (mapper) => {
  mapper.register(mapper.SNAKE_CASE_CONVENTION, 'questionDTOToDAL', AnswerDTO, Object, (mapping) => {
    mapping.convert((questionInfo) => {
      return {
        rating: questionInfo.rating,
        author: mapper.userDTOToDAL(questionInfo.author),
        text: questionInfo.text,
        dateOfCreation: questionInfo.dateOfCreation,
        dateOfUpdate: questionInfo.dateOfUpdate
      };
    });
  });
};