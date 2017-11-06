const path = require('path');
const LoaderOptionsPlugin = require('webpack');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const publicPath = '/assets/dist/';

const dev = true;
const extractToCSS = new ExtractTextPlugin({
    // publicPath: '../../',
    filename: publicPath + 'css/[name].css',
    disable: dev
});
const _pathCSS = dev ? "./assets" : "../.." // From the css output to the assets directory

module.exports = { // See https://webpack.js.org/concepts/
    devtool: 'source-map',
    target: 'web',
    // target: 'node',
    context: path.resolve(__dirname, './'),
    entry: {
        main: './assets/src/front/js/main.ts',
    },
    output: {
        path: path.resolve(__dirname, './'),
        publicPath: '',
        filename: '.' + publicPath + 'js/[name].bundle.js',
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
                use: 'ts-loader',
                exclude: /node_modules/
            },
            { // Sass loader
                test: /\.sass$/,
                use: extractToCSS.extract({
                    use: [
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
                                transformText: content => content.replace(/_assets/g, _pathCSS)
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
                        },
                        // {
                        //     loader: "resolve-url-loader"
                        // },
                        {
                            loader: 'text-transform-loader',
                            options: {
                                transformText: content => content.replace(/_assets/g, _pathCSS)
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
                        name: '.' + publicPath + 'img/[name].[ext]'
                    }
                }]

            },
            { // Font loader
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '.' + publicPath + 'fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            "jquery-mobile": "jquery-mobile/dist/jquery.mobile" //webpack couldn't find jquery-mobile so I set the path myself
        },
    },
    plugins: [
        require('autoprefixer'),
        extractToCSS, // see first few line to see the definition and the output
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Backbone: "backbone",
            _: "underscore",
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
};

// Tuto: https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783
// Doc: https://webpack.js.org

// NOTE: const is like var

// NOTE: __dirname refers to the directory where this webpack.config.js lives, which in this blogpost is the project root.

// NOTE: in the output, [name] stands for the entry name of your entry, in this case it's main

// NOTE: queries are now options so if you have something like: {loader: 'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'}, you can turn it into {loader: 'image-webpack-loader', options: {bypassOnDebug: true, optimizationLevel: 7, interlaced: false}
// See https://webpack.js.org/guides/migrating/#what-are-options-
