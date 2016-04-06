var glob = require('glob');

module.exports = {
  entry: glob.sync('./client/src/*.js').concat([
    './node_modules/three/three.js',
    './node_modules/sha512/lib/index.js',
    // './node_modules/websocket.io/lib/socket.js'
  ]),
  output: {
    path: 'client/dist/',
    filename: 'proc.edu.ria.client.js'
  },
  target: "web",
  // externals: /.*node_modules.*/,
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
