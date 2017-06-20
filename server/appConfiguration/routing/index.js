'use strict';

const configRoutesFunctions = [
  require('')
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