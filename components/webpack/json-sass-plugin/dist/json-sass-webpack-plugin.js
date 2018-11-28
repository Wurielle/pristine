'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var fs = require('fs');
var path = require('path');

var jsonSass = require('./json-sass');

var JsonSassPlugin = function () {
    function JsonSassPlugin(src, output, options) {
        _classCallCheck(this, JsonSassPlugin);

        this.defaultOptions = {};
        this.src = src;
        this.output = output;
        this.options = options;
    }

    _createClass(JsonSassPlugin, [{
        key: 'throw',
        value: function _throw(err) {
            throw err;
        }
    }, {
        key: 'getSass',
        value: function getSass(object) {
            return "$" + path.parse(this.src).name + ":" + jsonSass.convertJs(object) + ";";
        }
    }, {
        key: 'tester',
        value: function tester() {
            return true;
        }
    }, {
        key: 'apply',
        value: function apply(compiler) {
            var _this = this;

            var src = this.src || this.throw('src is required');
            var srcFullPath = path.resolve(process.cwd(), src);
            var output = this.output || path.parse(this.src).name + '.scss';
            var outputFullPath = path.resolve(process.cwd(), output);

            compiler.plugin("watch-run", function (compiler, done) {
                var changedFiles = _this.getChangedFiles(compiler);
                if (changedFiles.some(function (file) {
                    return file === srcFullPath;
                })) {
                    delete require.cache[srcFullPath];
                    var themeJS = require(srcFullPath);
                    var themeSASS = _this.getSass(themeJS);
                    fs.writeFile(outputFullPath, themeSASS, function () {
                        done();
                    });
                } else {
                    done();
                }
            });
        }
    }, {
        key: 'getChangedFiles',
        value: function getChangedFiles(compiler) {
            var watchFileSystem = compiler.watchFileSystem;

            var watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

            return Object.keys(watcher.mtimes);
        }
    }]);

    return JsonSassPlugin;
}();

module.exports = JsonSassPlugin;

//# sourceMappingURL=json-sass-webpack-plugin.js.map