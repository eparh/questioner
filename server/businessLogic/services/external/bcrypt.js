'use strict';

const bcrypt = require('bcrypt');

class BcryptService {
  constructor() {
    this.rounds = 10;
  }

  generateHash(password) {
    return bcrypt.hash(password, this.rounds);
  }

  validatePassword(password, passwordInDB) {
    return bcrypt.compare(password, passwordInDB);
  }
}

module.exports = BcryptService;