require('newrelic');
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Router } = require('./router');
const PORT = process.env.PORT || 2106; 
require('../db/config/');

const corOpts = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

const app = express();

app.use(morgan('dev'));
app.use(cors(corOpts));
app.use(helmet());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../static')));

app.use('/api', Router);

app.listen(PORT, (err) => {
  (err) && console.log('Error connecting to server: ', err);
  console.log('Successfully connected to server on port', PORT);
});