'use strict';

class UserService {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  register(formData) {

    return this.userRepository.create(formData);
  }
}

module.exports = UserService;