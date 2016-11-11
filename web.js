'use strict';

var express = require('express');
var app = express();

var gulp = require('gulp');
require('./gulpfile');

gulp.start('config');

// app.use(express.logger('dev'));
//app.use(gzippo.staticGzip("" + __dirname + "/app"));
app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 8000;
app.listen(port);

console.log('Magic happening on port ' + port)