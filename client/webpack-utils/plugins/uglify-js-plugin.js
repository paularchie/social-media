const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
    new UglifyJsPlugin({
        uglifyOptions: {
            mangle: true,
            output: {
                beautify: true
            }
        },
    })
];

