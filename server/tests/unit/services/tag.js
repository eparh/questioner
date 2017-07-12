'use strict';

const expect = require('chai').expect;

const { mapper } = require('../../../helpers/iocContainer').getAllDependencies();
const { createStub } = require('../../helpers/utils/fakesHelper');

const TagService = require('../../../businessLogic/services/tag');

describe('Tag Service', () => {
  describe('getAll', () => {
    let tagRepository;
    let service;

    before(() => {
      tagRepository = createStub({
        methodName: 'getAll'
      });
      service = new TagService({
        tagRepository,
        mapper
      });
    });

    it('should get all', async () => {
      service.getAll();
      const result = tagRepository.getAll.called;

      return expect(result).true;
    });
  });

  describe('create', () => {
    let tagRepository;
    let service;

    before(() => {
      tagRepository = createStub({
        methodName: 'create'
      });
      service = new TagService({
        tagRepository,
        mapper
      });
    });

    it('should create', async () => {
      service.create();

      const result = tagRepository.create.called;

      return expect(result).true;
    });
  });

  describe('update', () => {
    let tagRepository;
    let service;

    before(() => {
      tagRepository = createStub({
        methodName: 'updateById'
      });
      service = new TagService({
        tagRepository,
        mapper
      });
    });

    it('should update', async () => {
      service.update();

      const result = tagRepository.updateById.called;

      return expect(result).true;
    });
  });

  describe('delete', () => {
    let tagRepository;
    let service;

    before(() => {
      tagRepository = createStub({
        methodName: 'removeById'
      });
      service = new TagService({
        tagRepository,
        mapper
      });
    });

    it('should delete', async () => {
      service.delete();

      const result = tagRepository.removeById.called;

      return expect(result).true;
    });

  });
});
