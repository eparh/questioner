'use strict';

const fs = require('fs');
const path = require('path');

class FilesHelper {
  getAllFilesInFolder(dir, _files = []) {
    const files = fs.readdirSync(dir);

    for (let i = 0; i < files.length; i++) {
      const name = path.resolve(dir, files[i]);

      if (fs.statSync(name).isDirectory()) {
        this.getAllFilesInFolder(name, _files);
      } else {
        _files.push(name);
      }
    }

    return _files;
  }

  readFileAsync(pathToFile) {
    return new Promise((resolve, reject) => {
      fs.readFile(path.resolve(pathToFile), (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }
}

module.exports = new FilesHelper();