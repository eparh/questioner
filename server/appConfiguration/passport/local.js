'use strict';

const LocalStrategy = require('passport-local').Strategy;
const userService = require('../../helpers/iocContainer')._container.cradle.userService;


module.exports = new LocalStrategy({
  usernameField: 'email'
},
async (username, password, done) => {
  try {
    const user = await userService.findByEmail(username);

    if (!user) {
      return done(null, false, {
        message: 'Unknown user'
      });
    }

    if (!userService.validatePassword(password, user.password)) {
      return done(null, false, {
        message: 'Invalid password'
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}
);