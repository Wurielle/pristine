const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const jsonSass = require('json-sass');
const watch = require('node-watch');

const themePath = './config/theme.js';
const themeSassPath = './config/theme.scss';

if (fs.existsSync(themePath)) {
    let theme = require(themePath);
    function getSass(object){
        return "$theme:"+jsonSass.convertJs(JSON.parse(JSON.stringify(object).replace(/:":"/g, ":\"\\\\:\"")))+";";
    };
    let themeSASS = getSass(theme);
    fs.writeFileSync(themeSassPath, themeSASS);
    watch(path.join(themePath), (evt, name) => {
        console.log('File Changed', evt, name);
        let newTheme = require(themePath);
        themeSASS = getSass(newTheme);
        fs.writeFileSync(themeSassPath, themeSASS);
    });
}

module.exports = {
    baseUrl: './',
    css: {
        loaderOptions: {
            sass: {
                functions: {

                }
            }
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@config':  path.resolve(__dirname, 'config'),
            }
        },
        plugins:[
            new webpack.DefinePlugin({
                // 'API_AUTH_USERNAME': JSON.stringify(argv.apiAuthUsername.trim()),
                // 'API_AUTH_PASSWORD': JSON.stringify(argv.apiAuthPassword.trim()),
                // 'SERVICE_URL': JSON.stringify(argv.domain.trim())
            })
        ]
    }
};