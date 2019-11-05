const path = require("path");

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
        new JsonSassPlugin('./config/pristine.config.js', './config/pristine.config.scss'),
    ]
};
