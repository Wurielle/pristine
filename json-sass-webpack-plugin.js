/**
 * Exports a JavaScript module to a Sass Variable.
 * @name JsonSassWebpackPlugin
 * @param {string} srcFile
 * @param {string} outputFile
 * @example
 *  // webpack.config.js
 *  module.exports = {
 *      ...
 *      plugins: [
 *          ...
 *          new JsonSassWebpackPlugin('./config/theme.js', './config/theme.scss'),
 *      ]
 *  }
 */

const fs = require('fs');
const path = require('path');

const jsonSass = require('json-sass');

class JsonSassWebpackPlugin {
    constructor(src, output, options) {
        this.defaultOptions = {};
        this.src = src;
        this.output = output;
        this.options = options;
    }
    throw(err) {
        throw err;
    }
    getSass(object) {
        return "$"+path.parse(this.src).name+":"+jsonSass.convertJs(JSON.parse(JSON.stringify(object).replace(/:":"/g, ":\"\\\\:\"")))+";";
    }
    apply(compiler) {
        let src = this.src || this.throw('src is required');
        let output = this.output || path.parse(this.src).name+'.scss';

        if (fs.existsSync(src)) {
            let theme = require(src);
            let themeSASS = this.getSass(theme);
            fs.writeFileSync(output, themeSASS);
            fs.watchFile(path.join(src), () => {
                let newTheme = require(src);
                themeSASS = this.getSass(newTheme);
                fs.writeFileSync(output, themeSASS);
            });
        }
    }
}

module.exports = JsonSassWebpackPlugin;