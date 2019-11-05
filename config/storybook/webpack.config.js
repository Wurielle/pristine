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
        ],
    },
    resolve: {
        alias: {
            '@config':  path.resolve(__dirname, '../../config'),
            '@':  path.resolve(__dirname, '../../src'),
        }
    },
    plugins:[
        new JsonSassPlugin('./config/pristine.config.js', './config/pristine.config.scss'),
    ]
};
