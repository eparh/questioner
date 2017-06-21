'use strict';

const path = require('path');
const { lowerFirst } = require('lodash');

const awilix = require('awilix');
const filesHelper = require('./filesHelper');

class IoCContainer {
  constructor(container) {
    this._container = container.createContainer();
    this._lifeTime = container.Lifetime;
  }

  register() {
    const self = this;

    self._registerMapper();
    self._registerLogger();

    self._registerDatabaseContext();
    self._registerRepositories();
    self._registerServices();
    self._registerControllers();
    self._registerRoutes();
  }

  resolve(instance) {
    return this._container.resolve(instance);
  }

  getAllDependencies() {
    return this._container.cradle;
  }

  setDependency(name, value, opts = {}) {
    const { _container, _lifeTime } = this;

    _container.registerClass({
      [name]: [value, Object.assign(opts, {
        lifetime: _lifeTime.SINGLETON
      })]
    });
  }

  setFunctionDependency(name, value, opts = {}) {
    const { _container, _lifeTime } = this;

    _container.registerFunction({
      [name]: [value, Object.assign(opts, {
        lifetime: _lifeTime.SINGLETON
      })]
    });
  }

  _registerFolder(directory, excludes = [], options) {
    const self = this;

    filesHelper.getAllFilesInFolder(directory).filter((file) => {
      return excludes.reduce((isNotExclude, excludePattern) => isNotExclude && !file.includes(excludePattern), true);
    }).forEach((file) => {
      const type = require(file);

      self.setDependency(lowerFirst(type.name), type, options);
    });
  }

  _registerMapper() {
    this.setFunctionDependency('mapper', require('./mapper'));
  }

  _registerLogger() {
    this.setDependency('logger', require('./logger'));
  }

  _registerDatabaseContext() {
    this.setDependency('dbContext', require('../dataAccess/context'));
  }

  _registerRepositories() {
    const reposDirectory = path.resolve(__dirname, '..', 'dataAccess', 'repositories');
    const excludes = ['base.js', '.DS_Store'];

    this._registerFolder(reposDirectory, excludes);
  }

  _registerServices() {
    const servicesDirectory = path.resolve(__dirname, '..', 'businessLogic', 'services');
    // const externalServicesDirectory = path.resolve(__dirname, '..', 'businessLogic', 'externalServices');
    const excludes = ['.DS_Store'];

    this._registerFolder(servicesDirectory, excludes);
    // this._registerFolder(externalServicesDirectory, excludes);
  }

  _registerControllers() {
    const controllersDirectory = path.resolve(__dirname, '..', 'web', 'controllers');
    const excludes = ['base.js', '.DS_Store'];

    this._registerFolder(controllersDirectory, excludes);
  }

  _registerRoutes() {
    const routesDirectory = path.resolve(__dirname, '..', 'web', 'routes');
    const excludes = ['base.js', '.DS_Store'];

    this._registerFolder(routesDirectory, excludes);
  }
}

const iocContainer = new IoCContainer(awilix);

module.exports = iocContainer;
iocContainer.register();