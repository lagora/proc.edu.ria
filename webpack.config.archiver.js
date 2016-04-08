var path = require('path');
module.exports = {
  entry: [
    './src/archiver.es6.js'
  ],
  output: {
    path: 'dist/',
    filename: 'archiver.js'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.es6\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
