const path = require("path");
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const plugins = require('./webpack-utils/plugins');
const loaders = require('./webpack-utils/loaders');


const webpackOption = {
    mode: 'production',
    entry: {
        "index": "./src/index.tsx",
    },
    output: {
        path: path.resolve(__dirname, "../exaricm-share-jar/src/main/assembly/web/clma-ui-components"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            loaders.babel,
            loaders.css,
            loaders.scss,
            loaders.file
        ],
    },
    plugins: [
        plugins.cleanWebpackPlugin,
        plugins.htmlWebpackPlugin,
        new BaseHrefWebpackPlugin({ baseHref: '/exaricm/page/clma/' })
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".jsx", ".js"]
    }
};

module.exports = webpackOption;


