const path = require("path");
const webpack = require('webpack');

const DSSPlugin = require('@bit/wurielle.pristine.webpack.dss-plugin');
const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');
module.exports = {
    resolve: {
        alias: {
            '@config':  path.resolve(__dirname, '../../config'),
            '@':  path.resolve(__dirname, '../../assets/app'),
        }
    },
    plugins:[
        new DSSPlugin({
            filter: /\.s(c|a)ss/,
            output: './assets/app/styleguide.json',
            watch: './assets/app'
        }),
        new JsonSassPlugin('./config/theme.js', './config/theme.scss'),
    ]
};