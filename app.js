const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blogApp');

app.set('view engine', 'pug');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

module.exports = app;
