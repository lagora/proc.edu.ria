module.exports = {
  entry: [
    './node_modules/three/src/Three.js',
    './node_modules/sha512/lib/sha512.js',
    './server/src/rule_0.js',
    './server/src/xyzScanner.js',
    './server/src/ProceduriaBuilder.js',
    './server/src/server.js'
  ],
  output: {
    path: 'server/dist/',
    filename: 'proc.edu.ria.server.js'
  },
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
