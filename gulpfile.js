'use strict';

let gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  webpack = require('webpack'),
  webpackStream = require('webpack-stream'),
  browserSync = require('browser-sync').create(),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  rigger = require('gulp-rigger');


gulp.task('scripts', function () {
  return gulp.src('src/js/main.js')
    .pipe(rigger())
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});
gulp.task('favicon', function () {
  return gulp.src('src/favicon.*')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});
gulp.task('html', function () {
  return gulp.src('src/*.html')
    .pipe(rigger())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});
gulp.task('fonts', function () {
  return gulp.src('src/fonts/*')
    .pipe(gulp.dest('dist/fonts/'))
    .pipe(browserSync.stream());
});
gulp.task('images', function () {
  return gulp.src('src/img/*')
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.stream());
});

gulp.task('serve', gulp.series('sass', 'html', 'scripts', 'fonts', 'favicon', function () {

  browserSync.init({
    server: './dist/',
    tunnel: true
  });

  gulp.watch('src/scss/*.scss', gulp.parallel('sass'));
  gulp.watch('src/**/*.html', gulp.parallel('html'));
  gulp.watch('src/js/*.js', gulp.parallel('scripts'));
  gulp.watch('src/fonts/*', gulp.parallel('fonts'));
}));


gulp.task('default', gulp.series('serve'));
