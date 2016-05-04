var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var fs = require('fs');
var builder = require('gulp-nw-builder');
var path = require('path');

var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('build', function () {
    browserify({entries: 'src/proc.edu.ria.es6.js', extensions: ['.js'], debug: true})
        .transform(babelify, { presets: ['es2015'] })
        .bundle()
        .pipe(source('proc.edu.ria.js'))
        .pipe(gulp.dest('build'));
});
 
gulp.task('build-node-webkit', function() {
  return gulp.src([
		'./package.json',
    './node_modules/three/three.js',
    './node_modules/three-orbit-controls/index.js',
		'index.html',
		'build/proc.edu.ria.js'
	])
    .pipe(builder({
        version: 'v0.12.2',
        platforms: ['linux64']
     }));
});
 
gulp.task('default', ['build', 'build-node-webkit']);