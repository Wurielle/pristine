const path = require("path");
const webpack = require('webpack');

const DSSPlugin = require('@bit/wurielle.pristine.webpack.dss-plugin');
const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');
module.exports = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    appendTsSuffixTo: ['\\.vue$']
                }
            }
        ]
    },
    resolve: {
        alias: {
            '@config':  path.resolve(__dirname, '../../config'),
            '@':  path.resolve(__dirname, '../../assets/app'),
        },
        extensions: ['.tsx', '.ts', '.js', '.vue']
    },
    plugins:[
        new DSSPlugin({
            filter: /\.s(c|a)ss/,
            output: './assets/app/styleguide.json',
            watch: './assets/app'
        }),
        new JsonSassPlugin('./config/tailwind.config.js', './config/tailwind.config.scss'),
    ]
};
