var path = require('path');
var projectRoot = process.env.PWD; // Absolute path to the project root
var resolveRoot = path.join(projectRoot, 'node_modules'); // project root/node_modules

module.exports = {
  entry: {
    proceduria: './src/proc.edu.ria.es6.js'
  },
  target: "node",
  output: {
    path: './build/',
    filename: "[name].js"
  },
  resolve: {
    root: path.join(__dirname),
    fallback: path.join(__dirname, 'node_modules'),
    modulesDirectories: ['rules', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx', '.scss', '.png', '.jpg', '.jpeg', '.gif']
  },
  module: {
    loaders: [
      {
        test: /\.es6\.js$/,
        loader: 'babel',
        exclude: '/node_modules/',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  devtool: "source-map"
};
