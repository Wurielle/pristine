const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');

module.exports = {
    publicPath: '/',
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
            new JsonSassPlugin('./config/tailwind.config.js', './config/tailwind.config.scss'),
        ]
    }
};
