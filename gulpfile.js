'use strict'
const prefixer = require('gulp-autoprefixer')
const gulp = require('gulp');
const sass = require('gulp-sass');
const clean = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
// var rimraf = require('gulp-rimraf')
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat')
var plumber = require('gulp-plumber');


gulp.task('default', ['watch', 'sass', 'js']);

gulp.task('sass', (done)=>{
  gulp.src('./client/sass/*.scss')
  .pipe(sass())
  .on('error', sass.logError)
  .pipe(prefixer({
    browsers: ['last 2 versions']
  }))
  .pipe(clean())
  .pipe(gulp.dest('./public/stylesheets'))
  .on('end', done) 
})

gulp.task('watch', () =>{
  gulp.watch('./client/sass/*.scss', ['sass'])
})




gulp.task('watch', ['watch:js']);


gulp.task('js', ['clean:js'], function() {
  return gulp.src('client/js/**/*.js')
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(babel({presets:['es2015']}))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});
//  watches js for changes
gulp.task('watch:js', function() {
  return gulp.watch('client/js/**/*.js', ['js']);
})
//  deletes all generated files living in 'public' dir
gulp.task('clean:js', function() {
  return gulp.src('public/js', {read:false})
    .pipe(plumber())
    // .pipe(rimraf());
})

// gulp.task('css', ['clean:css'], function () {
//   return gulp.src(['client/sass/**/*.scss', 'client/sass/**/*.sass'])
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(gulp.dest('public/css'));
// })
// //  watches scss for changes
// gulp.task('watch:css', function() {
//   return gulp.watch(['client/scss/**/*.scss','client/scss/**/*.sass'], ['css']);
// })
// gulp.task('clean:css', function() {
//   return gulp.src('public/css', {read:false})
//     .pipe(plumber())
//     .pipe(rimraf());
// })