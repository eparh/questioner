'use strict';

const mapper = require('object-mapper');
const mappingObject = require('../businessLogic/mappings');

module.exports = () => {
  return (source, name) => mapper(source, mappingObject[name]);
};

