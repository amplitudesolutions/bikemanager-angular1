'use strict';

var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');

var configureSetup  = {
  createModule: false,
  constants: {
  	API_URL: process.env.API_URL,
  	TEMP_USER: process.env.TEMP_USER
  }
};

gulp.task('config', function() {
  gulp.src('config.json')
      .pipe(gulpNgConfig('amplitudeApp', configureSetup))
      .pipe(gulp.dest('app/js')); 
});