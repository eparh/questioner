'use strict';

const mapper = require('object-mapper');
const mappingObject = require('../businessLogic/mappings/maps');

module.exports = (source, name) => mapper(source, mappingObject[name]);
