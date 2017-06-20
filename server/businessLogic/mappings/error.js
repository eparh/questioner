'use strict';

const AppErrorDTO = require('../models/errorDTO');

module.exports = (mapper) => {
  mapper.register(mapper.CAMEL_CASE_CONVENTION, 'toErrorDTO', Object, AppErrorDTO);
};

