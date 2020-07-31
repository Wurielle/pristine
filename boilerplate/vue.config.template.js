const renderer = ({project}) => {
    return `
require('dotenv').config()
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
// const glob = require('glob-all');

// const PurgeCSSPlugin = require('purgecss-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const JsonSassPlugin = require('@wurielle/json-sass-webpack-plugin');
const PrettierPlugin = require("prettier-webpack-plugin");
${
project === 'vue-cli-app' ? `
const pkg = require('./package.json');
` : project === 'vue-cli-symfony-4' ? `
const ManifestPlugin = require('webpack-manifest-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
` : ``
}

module.exports = {
    lintOnSave: !(argv._[0].indexOf('storybook') > -1),
    publicPath: ${project === 'vue-cli-symfony-4' ? `'/build/app/'` : `'/'`},
    ${project === 'vue-cli-symfony-4' ? `
    runtimeCompiler: true,
    outputDir: path.resolve(__dirname, "public/build/app/"),
    ` : ''}
    chainWebpack: config => {
        // vue inspect --plugins
        ${
            project === 'vue-cli-symfony-4' ? `
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
            .test(/\\.(png|jpe?g|gif|webp)(\\?.*)?$/)
            .use('file-loader')
            .loader('file-loader')
            .tap(options => {
                return {
                    ...options,
                    name: \`img/[name].[hash:8].[ext]\`,
                    limit: -1 // no limit
                };
            })
            .end();
            ` : `
        config
            .entry('app')
            .add(path.resolve(__dirname, 'src/pristine.ts'))
        ;
            `
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@root': path.resolve(__dirname),
                '@config':  path.resolve(__dirname, 'config'),
                '@components':  path.resolve(__dirname, 'components'),
                ${project === 'vue-cli-symfony-4' ? `
                '@': path.resolve(__dirname, 'assets/app'),
                'vue$': 'vue/dist/vue.esm.js',
                `: ''}
            }
        },
        plugins:[
            argv._[0].indexOf('storybook') > -1 ? () => null :
                new PrettierPlugin({
                    // See all options: https://prettier.io/docs/en/options.html
                    singleQuote: true,
                    trailingComma: 'all',
                    arrowParens: 'always',
                }),
            // new BundleAnalyzerPlugin(),
            // new PurgeCSSPlugin({
            //     paths: glob.sync([
            //         './templates/**/*.html.twig',
            //         './templates/**/*.stories.js',
            //         './src/**/*.vue',
            //         './src/**/*.stories.js',
            //     ],  { nodir: true }),
            // }),
            new webpack.DefinePlugin({
                // 'ARGV_VAR': JSON.stringify(argv.ARGV_VAR.trim()),
                // 'DOTENV_VAR': JSON.stringify(process.env.MY_VAR),
            }),
            new JsonSassPlugin('./config/pristine.config.js', './config/pristine.config.scss'),
            ${project === 'vue-cli-symfony-4' ? `
            new ManifestPlugin({ fileName: 'manifest.json' }),
            argv._[0].indexOf('storybook') > -1 || process.env.NODE_ENV === 'production' ? () => null :
                new BrowserSyncPlugin({
                    host: 'localhost',
                    port: 3000,
                    proxy: process.env.BROWSERSYNC_PROXY ? process.env.BROWSERSYNC_PROXY : 'http://55.55.55.55/',
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
                }),
            ` : ''}
        ],
    },
    ${project === 'vue-cli-app' ? `
    pluginOptions: {
        electronBuilder: {
            mainProcessFile: 'src/.electron/main.ts',
            chainWebpackMainProcess: config => {
                config.resolve.alias
                    .set('@', path.join(process.cwd(), './src'))
                    .set('@root', path.join(process.cwd(), './'));
            },
            chainWebpackRendererProcess: config => {},
            builderOptions: {
                appId: \`com.\${pkg.name}.app\`,
                files: [
                    '**/*',
                    '!src',
                    '!dist',
                    '!server',
                    '!pristine',
                ],
                mac: {
                    'category': \`com.\${pkg.name}.app\`
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
                ],
            },
        },
    },
    `: ''}
};
`;
}

module.exports = renderer;
