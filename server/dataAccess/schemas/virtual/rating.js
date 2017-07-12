'use strict';

module.exports = (self) => {
  const voters = Object.assign({}, self.voters);

  return Object.values(voters).reduce((sum, value) => {
    return sum + value;
  }, 0);
};