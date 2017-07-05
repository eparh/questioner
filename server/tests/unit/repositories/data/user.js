'use strict';

const usersToCreate = [
  {
    email: 'test@gmail.com',
    password: 'password',
    role: 'user'
  },
  {
    email: 'test2@gmail.com',
    password: 'password',
    role: 'admin'
  }
];
const userToCreate = {
  email: 'test3@gmail.com',
  password: 'password',
  role: 'user'
};
const userToUpdate = {
  email: 'test4@gmail.com',
  password: 'password',
  role: 'user'
};

module.exports = {
  usersToCreate,
  userToCreate,
  userToUpdate
};