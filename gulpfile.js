const gulp = require('gulp');
const es6Pipeline = require('gulp-webpack-es6-pipeline');

es6Pipeline.registerBuildGulpTasks(
  gulp,
  {
    entryPoints: [
      './src/css/proc.edu.ria.css',
      './node_modules/three/three.js',
      './src/es6/config.js',
      './src/es6/main.js'
    ],
    outputDir: './dist'
  }
);
