const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config');
require('./services/passport');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogApp');

app.set('view engine', 'pug');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: config.secret,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 60 * 60
  })
}));
app.use(passport.initialize());
app.use(passport.session());

routes(app);

module.exports = app;
