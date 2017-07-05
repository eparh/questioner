'use strict';

const bcrypt = require('bcrypt-nodejs');

class BcryptService {
  constructor() {
    this.rounds = 10;
  }

  generateHash(password) {
    const salt = this._getSalt();

    return bcrypt.hashSync(password, salt);
  }

  validatePassword(password, passwordInDB) {
    return bcrypt.compareSync(password, passwordInDB);
  }

  _getSalt() {
    return bcrypt.hashSync(this.rounds);
  }
}

module.exports = BcryptService;