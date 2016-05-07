var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var watch = require('gulp-watch');
var fs = require('fs-extra');
var path = require('path');
var glob = require('glob');
var batch = require('gulp-batch');

gulp.task('rules', function () {
  let code = '';
  let names = [];
  glob.sync('./src/rules/*').sort().forEach((filepath, index) => {
    let name = `rule_${index}`;
    names.push(name);
    code += `import ${name} from '${filepath.replace('src/', '')}';\n`;
  });
  code += `\nexport { ${names.join(', ')} };`;
  fs.writeFileSync('./src/rules.es6.js', code, {enc: 'uf8'});
  return;
});

gulp.task('dist', function () {
  fs.removeSync('./dist/');
  fs.removeSync('./build/');
  fs.copySync('./package.json', './dist/package.json');
  fs.copySync('./index.html', './dist/index.html');
  fs.copySync('./node_modules/three/three.js', './dist/three.js');
  fs.copySync('./node_modules/three-orbit-controls/index.js', './dist/three-orbit-controls.js');
  return;
});

gulp.task('build', function () {
  browserify({entries: 'src/proc.edu.ria.es6.js', extensions: ['.es6.js'], debug: true})
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .pipe(source('proc.edu.ria.js'))
    .pipe(gulp.dest('dist'));
});


gulp.task('watch', function () {
    watch(['./src/**/*.js', '!./src/**/rules.es6.js'], batch(function (events, done) {
        gulp.start('rules_build_dist', done);
    }));
});

gulp.task('rules_build_dist', ['rules', 'dist', 'build']);
gulp.task('build_dist', ['dist', 'build']);
// gulp.task('default', ['rules', 'dist', 'build']);
gulp.task('default', ['build_dist']);
