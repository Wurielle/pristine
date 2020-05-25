const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const JsonSassPlugin = require('@wurielle/json-sass-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");

module.exports = {
    publicPath: '/build/app/',
    runtimeCompiler: true,
    outputDir: path.resolve(__dirname, "public/build/app/"),
    chainWebpack: config => {
        // vue inspect --plugins
        config
            .entry('app')
            .clear()
            .add(path.resolve(__dirname, 'assets/app/pristine.ts'))
            .add(path.resolve(__dirname, 'assets/app/main.ts'))
        ;
        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch');
        config.plugins.delete('copy');
        config.plugins.delete('hmr');
        const imagesRule = config.module.rule('images');
        imagesRule.uses.clear();
        imagesRule
        // you can set whatever you want or remove this line completely
            .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
            .use('file-loader')
            .loader('file-loader')
            .tap(options => {
                return {
                    ...options,
                    name: `img/[name].[hash:8].[ext]`,
                    limit: -1 // no limit
                };
            })
            .end();
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@root': path.resolve(__dirname),
                '@components':  path.resolve(__dirname, 'components'),
                '@config':  path.resolve(__dirname, 'config'),
                '@': path.resolve(__dirname, 'assets/app'),
                'vue$': 'vue/dist/vue.esm.js',
            }
        },
        plugins:[
            new PrettierPlugin({
                // See all options: https://prettier.io/docs/en/options.html
                singleQuote: true,
                trailingComma: 'all',
                arrowParens: 'always',
            }),
            new webpack.DefinePlugin({
                // 'API_AUTH_USERNAME': JSON.stringify(argv.apiAuthUsername.trim()),
                // 'API_AUTH_PASSWORD': JSON.stringify(argv.apiAuthPassword.trim()),
                // 'DOMAIN_URL': JSON.stringify(argv.domain.trim()),
                // ...
            }),
            new JsonSassPlugin('./config/pristine.config.js', './config/pristine.config.scss'),
            new ManifestPlugin({ fileName: 'manifest.json' }),
            new BrowserSyncPlugin(
                {
                    host: 'localhost',
                    port: 3000,
                    proxy: 'http://55.55.55.55/',
                    notify: false,
                    open: false,
                    files: [
                        {
                            match: [
                                './templates/**/*.twig',
                            ],
                            fn: function(event, file) {
                                if (event === 'change') {
                                    const bs = require('browser-sync').get('bs-webpack-plugin');
                                    bs.reload();
                                }
                            }
                        }
                    ]
                }
            )
        ]
    }
};
