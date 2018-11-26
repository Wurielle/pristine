'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var fs = require('fs');
var path = require('path');

var jsonSass = require('json-sass');

var JsonSassWebpackPlugin = function () {
    function JsonSassWebpackPlugin(src, output, options) {
        _classCallCheck(this, JsonSassWebpackPlugin);

        this.defaultOptions = {};
        this.src = src;
        this.output = output;
        this.options = options;
    }

    _createClass(JsonSassWebpackPlugin, [{
        key: 'throw',
        value: function _throw(err) {
            throw err;
        }
    }, {
        key: 'getSass',
        value: function getSass(object) {
            return "$" + path.parse(this.src).name + ":" + jsonSass.convertJs(JSON.parse(JSON.stringify(object).replace(/:":"/g, ":\"\\\\:\""))) + ";";
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
            var output = this.output || path.parse(this.src).name + '.scss';

            if (fs.existsSync(path.resolve(process.cwd(), src))) {
                var theme = require(path.resolve(process.cwd(), src));
                var themeSASS = this.getSass(theme);
                fs.writeFileSync(path.resolve(process.cwd(), output), themeSASS);
                fs.watchFile(path.resolve(process.cwd(), src), function () {
                    var newTheme = require(path.resolve(process.cwd(), src));
                    themeSASS = _this.getSass(newTheme);
                    fs.writeFileSync(path.resolve(process.cwd(), output), themeSASS);
                });
            }
        }
    }]);

    return JsonSassWebpackPlugin;
}();

module.exports = JsonSassWebpackPlugin;

//# sourceMappingURL=json-sass-webpack-plugin.js.map