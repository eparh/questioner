'use strict';

class UserService {
  constructor({ userRepository, bcryptService }) {
    this.userRepository = userRepository;
    this.bcryptService = bcryptService;
  }

  async register(formData) {
    const { userRepository, bcryptService } = this;
    const user = await this.findByEmail(formData.email);

    if (!user) {
      formData.password = bcryptService.generateHash(formData.password);
      return userRepository.create(formData);
    }
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