'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**

 * @name DSSWebpackPlugin

 * @description Unofficial DSS Webpack Plugin

 * @param {Object} options

 * @param {string} [options.filter=/\.s(c|a)ss/] - Files to be matched.

 * @param {string} [options.watch=./src] - Directory to watch that includes files matching the filter pattern.

 * @param {string} [options.output=./styleguide.json] - JSON Output file.

 * @param {string} [options.detector=@] - Character to look for when parsing stylesheet comments.

 * @example

 *  // webpack.config.js

 *  module.exports = {

 *      ...

 *      plugins: [

 *          ...

 *          new DSSWebpackPlugin({

 *              filter: /\.s(c|a)ss/,

 *              output: './src/styleguide.json',

 *              watch: './src',

 *              detector: '_@'

 *          }),

 *      ]

 *  }

 */
var fs = require('fs');
var path = require('path');

var readMultipleFiles = require('read-multiple-files');
var dss = require('dss');

var DSSPlugin = function () {
    function DSSPlugin() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, DSSPlugin);

        this.files = [];
        this.parsedObject = null;
        this.defaultOptions = {
            filter: /\.s(c|a)ss/,
            output: './styleguide.json',
            watch: './',
            detector: '@'
        };
        this.options = _extends({}, this.defaultOptions, options);
        this.initDSS();
    }

    _createClass(DSSPlugin, [{
        key: 'initDSS',
        value: function initDSS() {
            var _this2 = this;

            var _options = this.options,
                filter = _options.filter,
                watch = _options.watch,
                detector = _options.detector;

            var pattern = new RegExp(".*" + detector);
            dss.detector(function (line) {
                if (typeof line !== 'string') {
                    return false;
                }
                var reference = line.split("\n\n").pop();
                // return !!reference.match(detector) && !reference.match(/.*@\//);
                return !!reference.match(pattern);
            });

            dss.parser('section', function (i, line, block) {
                // Just returns the lines contents
                return line.split('>').map(function (item) {
                    return item.trim();
                });
            });
            this.getFilesFromDir(path.resolve(process.cwd(), watch), filter, function (filepath) {
                _this2.files.push(filepath);
            });
        }
    }, {
        key: 'apply',
        value: function apply(compiler) {
            var _this3 = this;

            var filter = this.options.filter;

            compiler.plugin("watch-run", function (compiler, done) {
                var changedFiles = _this3.getChangedFiles(compiler);
                if (changedFiles.some(function (file) {
                    return filter.test(file);
                })) {
                    _this3.exportStyleguide();
                }
                done();
            });
        }
    }, {
        key: 'exportStyleguide',
        value: function exportStyleguide() {
            var content = [];
            var _this = this;
            var _options2 = this.options,
                output = _options2.output,
                detector = _options2.detector;

            var outputFullPath = path.resolve(process.cwd(), output);
            var markup1 = new RegExp(detector + 'markup\\\\r\\\\n', "gi");
            var markup2 = new RegExp(detector + 'markup\\\\n', "gi");
            readMultipleFiles(this.files).subscribe({
                next: function next(_ref) {
                    var path = _ref.path,
                        contents = _ref.contents;

                    content.push(contents.toString('utf-8'));
                },
                complete: function complete() {
                    content.join('\n');
                    dss.parse(content, {}, function (parsedObject) {

                        var folderPath = outputFullPath.substring(0, outputFullPath.lastIndexOf("/"));
                        _this.mkDirByPathSync(folderPath);
                        parsedObject = JSON.parse(JSON.stringify(parsedObject).replace(markup1, '').replace(markup2, ''));
                        if (!fs.existsSync(outputFullPath) || fs.existsSync(outputFullPath) && JSON.stringify(parsedObject) !== JSON.stringify(_this.parsedObject)) {
                            _this.parsedObject = parsedObject;
                            fs.writeFile(outputFullPath, JSON.stringify(parsedObject, null, 4), function () {
                                console.log('📖 Updated Styleguide');
                            });
                        }
                    });
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
    }, {
        key: 'getFilesFromDir',
        value: function getFilesFromDir(startPath, filter, callback) {
            if (!fs.existsSync(startPath)) {
                console.log("no dir ", startPath);
                return;
            }
            var files = fs.readdirSync(startPath);
            for (var i = 0; i < files.length; i++) {
                var filename = path.join(startPath, files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory()) {
                    this.getFilesFromDir(filename, filter, callback);
                } else if (filter.test(filename)) callback(filename);
            }
        }
    }, {
        key: 'mkDirByPathSync',
        value: function mkDirByPathSync(targetDir) {
            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref2$isRelativeToScr = _ref2.isRelativeToScript,
                isRelativeToScript = _ref2$isRelativeToScr === undefined ? false : _ref2$isRelativeToScr;

            var sep = path.sep;
            var initDir = path.isAbsolute(targetDir) ? sep : '';
            var baseDir = isRelativeToScript ? process.cwd() : '.';
            return targetDir.split(sep).reduce(function (parentDir, childDir) {
                var curDir = path.resolve(baseDir, parentDir, childDir);
                try {
                    fs.mkdirSync(curDir);
                } catch (err) {
                    if (err.code === 'EEXIST') {
                        // curDir already exists!
                        return curDir;
                    }

                    // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                    if (err.code === 'ENOENT') {
                        // Throw the original parentDir error on curDir `ENOENT` failure.
                        throw new Error('EACCES: permission denied, mkdir \'' + parentDir + '\'');
                    }

                    var caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                    if (!caughtErr || caughtErr && targetDir === curDir) {
                        throw err; // Throw if it's just the last created dir.
                    }
                }
                return curDir;
            }, initDir);
        }
    }, {
        key: 'tester',
        value: function tester() {
            return true;
        }
    }]);

    return DSSPlugin;
}();

module.exports = DSSPlugin;

//# sourceMappingURL=dss-webpack-plugin.js.map