/**
 * Exports a JavaScript module to a Sass Variable.
 * @name JsonSassPlugin
 * @param {string} srcFile
 * @param {string} outputFile
 * @example
 *  // webpack.config.js
 *  module.exports = {
 *      ...
 *      plugins: [
 *          ...
 *          new JsonSassPlugin('./config/theme.js', './config/theme.scss'),
 *      ]
 *  }
 */

const fs = require('fs');
const path = require('path');

const jsonSass = require('./json-sass');

class JsonSassPlugin {
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
        const src = this.src || this.throw('src is required');
        const srcFullPath = path.resolve(process.cwd(), src);
        const output = this.output || path.parse(this.src).name+'.scss';
        const outputFullPath = path.resolve(process.cwd(), output);

        compiler.plugin("watch-run", (compiler, done) => {
            const changedFiles = this.getChangedFiles(compiler);
            if(changedFiles.some((file) => file === srcFullPath )) {
                delete require.cache[srcFullPath];
                let themeJS = require(srcFullPath);
                let themeSASS = this.getSass(themeJS);
                fs.writeFile(outputFullPath, themeSASS, () => {
                    done();
                });
            } else {
                done();
            }
        });
    }

    getChangedFiles(compiler) {
        const { watchFileSystem } = compiler;
        const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

        return Object.keys(watcher.mtimes);
    }
}

module.exports = JsonSassPlugin;