var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    // './src/assets/less/style.less',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, loaders: [ 'babel' ], exclude: /node_modules/, include: __dirname + '/src/' },
      // { test: /\.less$/, loaders: [ 'less-loader' ], exclude: /node_modules/, include: __dirname + '/src/assets/less' },
    ]
  },
  devServer: {
    port: 9001,
    hot: true,
    noInfo: false,
    contentBase: './dist/',
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
