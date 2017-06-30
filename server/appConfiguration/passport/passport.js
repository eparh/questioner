'use strict';

const passport = require('koa-passport');
const userService = require('../../helpers/iocContainer')._container.cradle.userService;
const authenticationMiddleware = require('../../middlewares/security/auth');
const local = require('./local');

module.exports = async (app) => {

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((id, done) => {
    userService.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });

  passport.use(local);

  passport.authenticationMiddleware = authenticationMiddleware;

  app.use(passport.initialize());
  app.use(passport.session());
};