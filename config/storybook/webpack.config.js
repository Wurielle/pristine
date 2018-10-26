const path = require("path");
const webpack = require('webpack');
// https://github.com/storybooks/storybook/pull/4411 POSTCSS ISSUE
// https://github.com/storybooks/storybook/issues/3850 Vue Issue
module.exports = {
    resolve: {
        alias: {
            '@config':  path.resolve(__dirname, '../../config'),
            '@':  path.resolve(__dirname, '../../src'),
        }
    },
};

// const path = require("path");
// const webpack = require('webpack');
// // https://github.com/storybooks/storybook/pull/4411 POSTCSS ISSUE
// // https://github.com/storybooks/storybook/issues/3850 Vue Issue
// module.exports = {
//     resolve: {
//         alias: {
//             '@config':  path.resolve(__dirname, '../config'),
//             '@':  path.resolve(__dirname, '../src'),
//         }
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             Vue: ['vue/dist/vue.esm.js', 'default']
//         })
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.scss$/,
//                 loaders: [
//                     "style-loader",
//                     {
//                         loader: 'css-loader',
//                         options: { importLoaders: 1 }
//                     },
//                     "sass-loader",
//                     {
//                         loader: 'postcss-loader',
//                         options: {
//                             ident: 'postcss',
//                             importLoaders: 1,
//                             config: {
//                                 path: path.resolve(__dirname, '../')
//                             },
//                             plugins: () => [
//                                 require('tailwindcss')(path.resolve(__dirname, '../config/theme.js')),
//                                 require('autoprefixer'),
//                                 require('postcss-pxtorem')({
//                                     replace: true,
//                                     propList: ['*'],
//                                 })
//                             ],
//                         }
//                     }
//                 ],
//                 include: path.resolve(__dirname, "../")
//             },
//             {
//                 test: /\.vue$/,
//                 loader: 'vue-loader',
//                 include: path.resolve(__dirname, "../")
//             },
//         ],
//     }
// };