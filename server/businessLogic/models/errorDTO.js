'use strict';

class AppErrorDTO {
  constructor() {
    this.validationErrors = undefined;
    this.errorMessage = undefined;
    this.status = undefined;
  }
}

module.exports = AppErrorDTO;