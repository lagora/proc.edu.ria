var path = require('path');
module.exports = {
  entry: [
    // './src/css/proc.edu.ria.css',
    './node_modules/three/src/Three.js',
    './node_modules/three/examples/js/controls/OrbitControls.js',
    './node_modules/sha512/lib/sha512.js',
    './src/es6/config.js',
    './src/es6/init.js',
    './src/es6/ProceduriaBuilder.js',
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
