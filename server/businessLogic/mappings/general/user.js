'use strict';

module.exports = (mapper) => {
  mapper.register(mapper.SNAKE_CASE_CONVENTION, 'userDTOToDAL', Object, Object);
};