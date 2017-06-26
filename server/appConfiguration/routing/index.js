'use strict';

const configRoutesFunctions = [
  require('./question'),
  require('./tag'),
  require('./user')
];
const routes = require('../../helpers/iocContainer').getAllDependencies();

module.exports = (app) => {
  function applyRoutes (routesNames) {
    routesNames.forEach((routeName) => {
      app.use(routes[routeName].apply());
    });
  }

  configRoutesFunctions.forEach((configRoute) => {
    configRoute(applyRoutes);
  });
};