'use strict';

module.exports = ({ paramsValidator }) => {
  paramsValidator.property('id').isNotEmpty();
};