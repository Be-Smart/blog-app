const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => done(err, false));
});

const localLogin = new LocalStrategy((username, password, done) => {
  User.findOne({email: username})
    .then(user => {
      if (!user) { return done(null, false); }

      user.comparePassword(password)
        .then(isMatch => {
          if (!isMatch) { return done(null, false); }
          return done(null, user);
        })
        .catch(err => done(err));
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

passport.use(jwtLogin);
passport.use(localLogin);
