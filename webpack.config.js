var LiveReloadPlugin = require('webpack-livereload-plugin');
var path = require('path');
var three = require('three');

module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    externals: {
        THREE: three
    },
    plugins: [
        new LiveReloadPlugin()
    ],
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015']
                }
            }
        ]
    }
};