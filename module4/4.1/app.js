var express = require('express');
var logger = require('morgan');

var filmRouteur = require('./routes/film');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/film', filmRouteur);


module.exports = app;
