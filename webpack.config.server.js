module.exports = {
  entry: './server/src/server.es6.js',
  output: {
    path: './server/dist',
    filename: 'proc.edu.ria.server.js'
  },
  target: "node",
  module: {
    loaders: [
      {
        test: /\.es6\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json/,
        loader: 'json-loader'
      }
    ]
  }
};
