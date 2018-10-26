const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const DSSWebpackPlugin = require('./dss-webpack-plugin.js');
const JsonSassWebpackPlugin = require('./json-sass-webpack-plugin.js');

module.exports = {
    baseUrl: '/',
    configureWebpack: {
        resolve: {
            alias: {
                '@config':  path.resolve(__dirname, 'config'),
            }
        },
        plugins:[
            new webpack.DefinePlugin({
                // 'API_AUTH_USERNAME': JSON.stringify(argv.apiAuthUsername.trim()),
                // 'API_AUTH_PASSWORD': JSON.stringify(argv.apiAuthPassword.trim()),
                // 'SERVICE_URL': JSON.stringify(argv.domain.trim())
            }),
            new DSSWebpackPlugin({
                filter: /\.s(c|a)ss/,
                output: './src/styleguide.json',
                watch: './src',
                detector: '_@'
            }),
            new JsonSassWebpackPlugin('./config/theme.js', './config/theme.scss')
        ]
    }
};