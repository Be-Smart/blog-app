const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const localLogin = new LocalStrategy((username, password, done) => {
  User.findOne({email: username})
    .then(user => {
      if (!user || user.password !== password) {
        return done(null, false);
      }

      done(null, user);
    })
    .catch(err => done(err));
});

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });
//
// passport.deserializeUser((id, done) => {
//   User.findById(id)
//     .then(user => done(null, user))
//     .catch(err => done(err));
// });

passport.use(localLogin);
