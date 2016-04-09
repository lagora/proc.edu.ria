var glob = require('glob');

module.exports = {
  entry: glob.sync('./server/src/*.js').concat('./node_modules/websocket.io/lib/websocket.io.js'),
  output: {
    path: 'server/dist/',
    filename: 'proc.edu.ria.server.js'
  },
  target: "node",
  module: {
    loaders: [
      {
        test: /\.es6\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
      ,{
        test: /\.json$/,
        loader: 'json-loader'
      }
      ,{
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
};
