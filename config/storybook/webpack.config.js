const path = require("path");
const webpack = require('webpack');

const DSSPlugin = require('@bit/wurielle.pristine.webpack.dss-plugin');
const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');
module.exports = {
    resolve: {
        alias: {
            '@config':  path.resolve(__dirname, '../../config'),
            '@':  path.resolve(__dirname, '../../src'),
        }
    },
    plugins:[
        new DSSPlugin({
            filter: /\.s(c|a)ss/,
            output: './src/styleguide.json',
            watch: './src'
        }),
        new JsonSassPlugin('./config/pristine.config.js', './config/pristine.config.scss'),
    ]
};
