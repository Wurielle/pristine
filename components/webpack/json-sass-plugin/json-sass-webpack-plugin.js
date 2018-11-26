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
    tester() {
        return true;
    }
    apply(compiler) {
        let src = this.src || this.throw('src is required');
        let output = this.output || path.parse(this.src).name+'.scss';

        if (fs.existsSync(path.resolve(process.cwd(), src))) {
            let theme = require(path.resolve(process.cwd(), src));
            let themeSASS = this.getSass(theme);
            fs.writeFileSync(path.resolve(process.cwd(), output), themeSASS);
            fs.watchFile(path.resolve(process.cwd(), src), () => {
                let newTheme = require(path.resolve(process.cwd(), src));
                themeSASS = this.getSass(newTheme);
                fs.writeFileSync(path.resolve(process.cwd(), output), themeSASS);
            });
        }
    }
}

module.exports = JsonSassWebpackPlugin;