'use strict';

const { conflict } = require('../../constants').STATUS_CODES;

class UserService {
  constructor({ userRepository, bcryptService }) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async register(formData) {
    const { userRepository, bcryptService } = this;
    const user = await this.findByEmail(formData.email);

    if (!user) {
      const data = Object.assign({}, formData);

      data.password = await bcryptService.generateHash(formData.password);
      return userRepository.create(data);
    }
    return {
      statusCode: conflict
    };
  }

  findByEmail(email) {
    return this.userRepository.findOne({
      email
    });
  }

  findById(id) {
    return this.userRepository.findById(id);
  }

  validatePassword(password, passwordInDB) {
    return this.bcryptService.validatePassword(password, passwordInDB);
  }
}

module.exports = UserService;