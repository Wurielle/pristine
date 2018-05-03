// Minimist
// var argv = require('minimist')(process.argv.slice(2));
// var argv = require( 'argv' );
// var args = argv.run();
// console.dir(args);
// Node envoironments
const bs = process.env.NODE_ENV.trim() === 'browsersync' ? true : false;
const dev = process.env.NODE_ENV.trim() === 'development' ? true : false;
const mode = process.env.NODE_ENV.trim() === 'production' ? 'production' : 'development';

// Webpack modules
const path = require('path');
const LoaderOptionsPlugin = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const {
    VueLoaderPlugin
} = require('vue-loader')

// Paths
const computed = {
    path: {
        toASSETS: function() {
            return './assets/'
        },
        toSRC: function() {
            return this.toASSETS() + 'src/'
        },
        toDIST: function() {
            return this.toASSETS() + 'dist/'
        },
        proxy: function() {
            return 'http://localhost:8080/namkin/base-symfony/web/app_dev.php/'
        },
        styles: function() {
            return this.toSRC() + 'front/sass'
        },
        public: function() {
            return '';
        },
        images: function() {

        },
        CSSAssets: function() {
            // From the css output to the assets directory
            let path = dev ? "/assets" : "../..";
            return path;
        }
    }
}
const extractToCSS = new ExtractTextPlugin({
    // publicPath: '../../',
    filename: computed.path.toDIST() + 'css/[name].css',
    disable: dev
});
const plugins = [
    require('autoprefixer'),
    extractToCSS, // see first few line to see the definition and the output
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Backbone: "backbone",
        _: "underscore",
    }),
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new VueLoaderPlugin()
];
if (bs) {
    plugins.push(new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        proxy: computed.path.proxy(),
        files: [{
            match: [
                './web/**/*.twig',
                './src/**/*.twig',
                './app/**/*.twig',
                './web/**/*.php',
                './src/**/*.php',
                './app/**/*.php',
                './web/**/*.yml',
                './src/**/*.yml',
                './app/**/*.yml',
                './**/*.env'
            ],
            ignore: [
                'node_modules'
            ],
            fn: function(event, file) {
                if (event === 'change') {
                    const bs = require('browser-sync').get('bs-webpack-plugin');
                    bs.reload();
                }
            }
        }]
    }))
} else if (mode === 'production') {
    // plugins.push(new UglifyJSPlugin({
    //     extractComments: true
    // }))
};

module.exports = { // See https://webpack.js.org/concepts/,
    mode: mode,
    devtool: 'source-map',
    target: 'web',
    // target: 'node',
    context: path.resolve(__dirname, './'),
    entry: {
        main: computed.path.toSRC() + 'front/js/main.ts',
    },
    output: {
        path: path.resolve(__dirname, './'),
        publicPath: '',
        filename: computed.path.toDIST() + 'js/[name].bundle.js',
    },
    devServer: {
        open: true,
        // port: 9000
        historyApiFallback: { // NOTE: Comment this if you're working on several pages
            index: 'index.html'
        }
    },
    module: {
        rules: [ // See: https://webpack.js.org/configuration/module/#rule, https://webpack.js.org/concepts/loaders/
            { // Typescript loader
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [
                    /node_modules/,
                    /vendor/ //Symfony's vendor folder
                ],
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { // Sass loader
                test: /\.s[a|c]ss$/,
                use: extractToCSS.extract({
                    use: [
                        // 'vue-style-loader',
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: function() {
                                    return [
                                        require('autoprefixer')
                                    ];
                                },
                                sourceMap: true
                            }
                        },
                        // {
                        //     loader: "resolve-url-loader"
                        // },
                        {
                            loader: 'text-transform-loader',
                            options: {
                                transformText: content => content.replace(/@assets/g, computed.path.CSSAssets())
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                indentedSyntax: 'sass',
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            { // Stylus loader
                test: /\.styl$/,
                use: extractToCSS.extract({
                    use: [
                        // 'vue-style-loader',
                        {
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: function() {
                                    return [
                                        require('autoprefixer')
                                    ];
                                },
                                sourceMap: true
                            }
                        },
                        // {
                        //     loader: "resolve-url-loader"
                        // },
                        {
                            loader: 'text-transform-loader',
                            options: {
                                transformText: content => content.replace(/@assets/g, computed.path.CSSAssets())
                            },
                        },
                        {
                            loader: "stylus-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: "style-loader"
                })
            },
            { // CSS loader
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader",
                            options: {
                                url: false
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: function() {
                                    return [
                                        require('autoprefixer')
                                    ];
                                },
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: "style-loader"
                }),
            },
            { // Mustache loader
                test: /\.html$/,
                use: "mustache-loader"
            },
            { // Image loader (Resolving Images path)
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: [/fonts/],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '.' + computed.path.toDIST() + 'img/[name].[ext]'
                    }
                }]

            },
            { // Font loader
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '.' + computed.path.toDIST() + 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            "jquery-mobile": "jquery-mobile/dist/jquery.mobile", //webpack couldn't find jquery-mobile so I set the path myself
            'vue$': 'vue/dist/vue.esm.js',
            // NOTE: Future improvement would be to not have to import all sass variables https://github.com/vuejs/vue-loader/issues/328
            'styles': path.resolve(__dirname, computed.path.styles())
        },
    },
    plugins: plugins
};

// Tuto: https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783
// Doc: https://webpack.js.org

// NOTE: const is like var

// NOTE: __dirname refers to the directory where this webpack.config.js lives, which in this blogpost is the project root.

// NOTE: in the output, [name] stands for the entry name of your entry, in this case it's main

// NOTE: queries are now options so if you have something like: {loader: 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'}, you can turn it into {loader: 'image-webpack-loader', options: {bypassOnDebug: true, optimizationLevel: 7, interlaced: false}
// See https://webpack.js.org/guides/migrating/#what-are-options-
