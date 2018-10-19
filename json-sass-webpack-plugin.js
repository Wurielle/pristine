/**
 * Exports a JavaScript module to a Sass Variable.
 * @name JsonSassWebpackPlugin
 * @param {string} inputFile - Can either be a Javascript Module or a JSON file.
 * @param {string} [outputFile=[inputFileName].scss]
 * @param {object} [options]
 * @param {string} [options.key=$theme] - Sass variable name.
 * @example
 *  // webpack.config.js
 *  module.exports = {
 *      ...
 *      plugins: [
 *          ...
 *          new JsonSassWebpackPlugin('./config/theme.js', './config/theme.scss', { key: '$theme' }),
 *      ]
 *  }
 */

const fs = require('fs');
const path = require('path');

const jsonSass = require('json-sass');

class JsonSassWebpackPlugin {
    constructor(src, output, options) {
        this.defaultOptions = {
            key: '$theme'
        };
        this.src = src;
        if (typeof this.output === 'object' && !Array.isArray(this.output)){
            this.options = output;
            this.output = null;
        } else {
            this.output = output;
            this.options = options || this.defaultOptions;
        }
    }
    throw(err) {
        throw err;
    }
    getSass(object) {
        let key = this.options.key || this.defaultOptions.key;
        return key+":"+jsonSass.convertJs(JSON.parse(JSON.stringify(object).replace(/:":"/g, ":\"\\\\:\"")))+";";
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