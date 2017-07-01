var path = require('path');
var SRC_DIR = path.resolve(__dirname, 'src');
var DIST_DIR = path.resolve(__dirname, 'dist');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var config = {
    entry:
    {
        // api: SRC_DIR + '/api.js',
        // rules: SRC_DIR + '/rules.js',
        index: SRC_DIR + '/index.js',
        proceduria: SRC_DIR + '/proceduria.js',
        edit: SRC_DIR + '/edit.js'
    },
    output: {
        path: DIST_DIR,
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js?/,
            include: SRC_DIR,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            https: false,
            open: false,
            port: 4004,
            server: { baseDir: ['./'] }
        })
    ]
};

module.exports = config;