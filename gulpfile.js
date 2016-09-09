'use strict';

let gulp = require('gulp');
let mocha = require('gulp-spawn-mocha');
let eslint = require('gulp-eslint');

let paths = {
  lint : ['foreclosure.js', , '!test/**', '!gulpfile.js', '!node_modules/**'],
  watch : ['gulpfile.js', './foreclosure.js', './test/**/*.js', '!test/{temp,temp/**}'],
  tests : ['./test/**/*.js', '!test/{temp,temp/**}']
};

let plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('lint', function() {
  return gulp.src(paths.lint)
    .pipe(eslint('.eslintrc.js'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('mocha', function() {
  return gulp.src(paths.tests)
    .pipe(mocha({
      reporter : 'spec',
      bail : true
    }))
});

gulp.task('watch', function() {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['lint', 'mocha', 'watch']);

gulp.task('default', ['test']);

