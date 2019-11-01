'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browsersync = require('browser-sync').create(),
    reload = browsersync.reload;

const SOURCE = {
  style: './src/scss/**/*.scss'
}    
const DIST = {
  style: './dist/css/'
}
sass.compiler = require('node-sass');

function scss() {
  return gulp.src(SOURCE.style)
   .pipe(sourcemaps.init())
   .pipe(sass().on('error', sass.logError))
   .pipe(sourcemaps.write())
   .pipe(gulp.dest(DIST.style))
   .pipe(browsersync.stream())
}
exports.style = scss;

function serve() {
  browsersync.init({
    server: "./"
  });

  gulp.watch(SOURCE.style, gulp.series(scss));
  gulp.watch('./**/*.html').on('change', reload);
}

exports.serve = gulp.series(scss, serve);
exports.default = exports.serve;