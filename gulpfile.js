var gulp = require('gulp');
var rename = require('gulp-rename');
var es6transpiler = require('gulp-es6-transpiler');

gulp.task('default', function () {
	return gulp.src('src/proc.edu.ria.es6.js')
		.pipe(es6transpiler({
      "environments": ["node"],
    }))
		.pipe(rename('proc.edu.ria.js'))
		.pipe(gulp.dest('build'));
});
