const passport = require('passport');
const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user._id, iat: timestamp}, config.secret);
}

module.exports = {
  loginView(req, res) {
    res.render('login', {title: 'Login'});
  },

  signin(req, res, next) {
    // console.log(req.user);
    res.header('x-auth', tokenForUser(req.user)).redirect('/');
    // res.redirect('/');
  },

  logout(req, res) {
    // req.logout();
    res.redirect('/login');
  }
};
