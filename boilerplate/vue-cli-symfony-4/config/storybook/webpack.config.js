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
            },
            {
                test: /\.twig$/,
                oneOf: [
                    {
                        resourceQuery: /raw/,
                        loader: 'raw-loader',
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ]
    },
    resolve: {
        alias: {
            '@config':  path.resolve(__dirname, '../../config'),
            '@':  path.resolve(__dirname, '../../assets/app'),
            '@root':  path.resolve(__dirname, '../../'),
        },
        extensions: ['.tsx', '.ts', '.js', '.vue']
    },
    plugins:[
        new DSSPlugin({
            filter: /\.s(c|a)ss/,
            output: './assets/app/styleguide.json',
            watch: './assets/app'
        }),
        new JsonSassPlugin('./config/pristine.config.js', './config/pristine.config.scss'),
    ]
};
