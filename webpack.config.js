var path = require('path');
module.exports = {
  entry: [
    // './src/css/proc.edu.ria.css',
    './node_modules/three/three.js',
    './src/es6/config.js',
    './src/es6/main.js'
  ],
  output: {
    path: 'dist/',
    filename: 'proc.edu.ria.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
      // ,{
      //   test: /\.css$/,
      //   loader: "style-loader!css-loader"
      // }
    ]
  }
};
