'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('img', ['img:clean'], function () {
  return gulp.src('img/*.sketch')
    .pipe($.sketch({
      export: 'slices',
      formats: [
        'png',
        'svg'
      ],
      scales: [
        '1.0',
        '2.0'
      ]
    }))
    .pipe($.ignore.exclude(/@2x.svg$/))
    .pipe($.imagemin({
      svgoPlugins: [
        {removeTitle: true},
        {removeDesc: true}
      ]
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe($.size({
      showFiles: true
    }));
});

gulp.task('img:clean', function (done) {
  del(['dist/img'], done);
});

gulp.task('build', ['img']);

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function () {
  gulp.watch('img/*.sketch', ['img']);
});
