const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');
const passport = require('passport');
// const session = require('express-session');
require('./services/passport');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogApp');

app.set('view engine', 'pug');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(session({
//   secret: '123qwerty123',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

routes(app);

module.exports = app;
