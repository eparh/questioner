'use strict';

const bcrypt = require('bcrypt-nodejs');

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async register(formData) {
    const { userRepository, generateHash } = this;

    const user = await this.findByEmail(formData.email);

    if (user) {
      // to-do
      return;
    }

    formData.password = generateHash(formData.password);
    return userRepository.create(formData);
  }

  findByEmail(email) {
    return this.userRepository.findOne({
      email
    });
  }

  async isAdmin(id) {
    const user = await this.findById(id);

    return user.role === 'admin';
  }

  findById(id) {
    return this.userRepository.findById(id);
  }

  generateHash(password) {
    return bcrypt.hashSync(password);
  }

  validatePassword(password, passwordInDB) {
    return bcrypt.compareSync(password, passwordInDB);
  }
}

module.exports = UserService;