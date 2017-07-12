'use strict';

const expect = require('chai').expect;

const { mapper } = require('../../../helpers/iocContainer').getAllDependencies();
const { createStub, createSpy, createMock } = require('../../helpers/utils/fakesHelper');

const UserService = require('../../../businessLogic/services/user');

describe('User Service', () => {
  describe('register', () => {
    let service;
    let serviceWithFoundUser;
    let bcryptService;
    let userRepository;

    before(() => {
      bcryptService = createSpy({
        methodName: 'generateHash'
      });
      userRepository = createSpy({
        methodName: 'create'
      });

      service = Object.assign(
        new UserService({
          bcryptService,
          mapper,
          userRepository
        })
        , createMock({
          methodName: 'findByEmail'
        }));

      serviceWithFoundUser = Object.assign(
        new UserService({
          bcryptService,
          mapper,
          userRepository
        })
        , createMock({
          methodName: 'findByEmail',
          returnValue: {}
        }));
    });

    it('should register', async () => {
      await service.register({});

      const result = service.findByEmail.called &&
        userRepository.create.called &&
        bcryptService.generateHash.called;

      return expect(result).true;
    });

    it('should not register', async () => {
      serviceWithFoundUser.register({});

      const result = serviceWithFoundUser.findByEmail.called;

      return expect(result).true;
    });
  });

  describe('findByEmail', () => {
    let userRepository;
    let service;

    before(() => {
      userRepository = createStub({
        methodName: 'findOne'
      });
      service = new UserService({
        userRepository,
        mapper
      });
    });

    it('should find by email', async () => {
      service.findByEmail();

      const result = userRepository.findOne.called;

      return expect(result).true;
    });
  });

  describe('findById', () => {
    let userRepository;
    let service;

    before(() => {
      userRepository = createStub({
        methodName: 'findById'
      });
      service = new UserService({
        userRepository,
        mapper
      });
    });

    it('should find by id', async () => {
      service.findById();

      const result = userRepository.findById.called;

      return expect(result).true;
    });
  });

  describe('validatePassword', () => {
    let bcryptService;
    let service;

    before(() => {
      bcryptService = createStub({
        methodName: 'validatePassword'
      });
      service = new UserService({
        bcryptService,
        mapper
      });
    });

    it('should validate password', async () => {
      service.validatePassword();

      const result = bcryptService.validatePassword.called;

      return expect(result).true;
    });
  });
});
