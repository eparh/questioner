'use strict';

const path = require('path');

const filesHelper = require('./filesHelper');
const Mapper = require('dee-mapper');

function registerMappings(mapper) {
  const mappingsDirectory = path.resolve(__dirname, '..', 'businessLogic', 'mappings');

  filesHelper.getAllFilesInFolder(mappingsDirectory).forEach((mappingPath) => {
    require(mappingPath)(mapper);
  });
}

module.exports = () => {
  const mapper = new Mapper();

  registerMappings(mapper);

  return mapper;
};