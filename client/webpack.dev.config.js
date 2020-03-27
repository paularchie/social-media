var path = require('path');
const plugins = require('./webpack-utils/plugins');
const loaders = require('./webpack-utils/loaders');
const HWP = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            loaders.typescript,
            loaders.css,
            loaders.scss
        ]
    },
    devServer: {
        host: '0.0.0.0',
        contentBase: './src',
        historyApiFallback: true,
        disableHostCheck: true
    },
    plugins: [
        new HWP(
            { template: path.join(__dirname, '/public/index.html') }
        )
    ]
};