module.exports = {
  entry:  './client/src/main.es6.js',
  output: {
    path: 'client/dist/',
    filename: 'proc.edu.ria.client.js'
  },
  // target: "web",
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
