'use strict';


module.exports = () => {
  return (ctx, next) => {
    const user = ctx.state.user;

    return user.role === 'admin' ? next() : ctx.redirect('/users/login');
  };
};