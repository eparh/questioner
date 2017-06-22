'use strict';

const fs = require('fs-extra');
const serverConfig = require('config').get('server');

function cleanTestImagesDirectory() {
  return new Promise((resolve, reject) => {
    fs.emptydir(serverConfig.get('uploadDir'), (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
}

module.exports = {
  cleanTestImagesDirectory
};