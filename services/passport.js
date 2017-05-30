/* eslint consistent-return: 0*/
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const localLogin = new LocalStrategy((username, password, done) => {
  User.findOne({ email: username })
    .then((user) => {
      if (!user) { return done(null, false); }

      user.comparePassword(password)
        .then((isMatch) => {
          if (!isMatch) { return done(null, false); }
          return done(null, user);
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
});

passport.serializeUser((user, done) => {
  const { _id: userId } = user;
  done(null, userId);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

passport.use(localLogin);
