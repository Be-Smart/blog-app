const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

module.exports = app;
