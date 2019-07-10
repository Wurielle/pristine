const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const pkg = require('./package.json');
const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');

module.exports = {
    publicPath: '/',
    chainWebpack: config => {
        // vue inspect --plugins
        config
            .entry('app')
            .add('animate.css/animate.min.css')
            .add('ionicons/dist/css/ionicons.min.css')
        ;
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@config':  path.resolve(__dirname, 'config'),
                '@components':  path.resolve(__dirname, 'components'),
            }
        },
        plugins:[
            new webpack.DefinePlugin({
                // 'API_AUTH_USERNAME': JSON.stringify(argv.apiAuthUsername.trim()),
                // 'API_AUTH_PASSWORD': JSON.stringify(argv.apiAuthPassword.trim()),
                // 'DOMAIN_URL': JSON.stringify(argv.domain.trim()),
                // ...
            }),
            new JsonSassPlugin('./config/tailwind.config.js', './config/tailwind.config.scss'),
        ]
    },
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: 'src/.electron/main.ts',
            builderOptions: {
                appId: `com.${pkg.name}.app`,
                files: [
                    '**/*',
                    '!src',
                    '!dist',
                    '!server',
                    '!pristine',
                ],
                mac: {
                    'category': `com.${pkg.name}.app`
                },
                win: {},
                publish: [
                    argv.c === 'store' ?
                        {
                            provider: 's3',
                            endpoint: 'http://55.55.55.1:9000',
                            bucket: pkg.name,
                        } :
                        {
                            // Generic
                            provider: 'generic',
                            url: 'https://path.to/folder-containing/lastestdotyml',

                            // GitHub e.g: https://github.com/MyGitHubUsername/my-repo-name
                            // provider: "github",
                            // owner: "MyGitHubUsername",
                            // repo: "my-repo-name"
                        }
                ]
            }
        }
    }
};
