'use strict';

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

var DSSWebpackPlugin = function () {
    function DSSWebpackPlugin(options) {
        _classCallCheck(this, DSSWebpackPlugin);

        this.files = [];
        this.parsedObject = null;
        this.defaultOptions = {
            filter: /\.s(c|a)ss/,
            output: './styleguide.json',
            watch: './',
            detector: '@'
        };
        this.options = options;
        this.initDSS(this.defaultOptions, this.options);
    }

    _createClass(DSSWebpackPlugin, [{
        key: 'initDSS',
        value: function initDSS(defaultOptions, options) {
            var _this2 = this;

            var filter = options.filter || defaultOptions.filter;
            var watch = options.watch || defaultOptions.watch;
            var detector = options.detector || defaultOptions.detector;
            detector = new RegExp(".*" + detector);
            dss.detector(function (line) {
                if (typeof line !== 'string') {
                    return false;
                }
                var reference = line.split("\n\n").pop();
                // return !!reference.match(detector) && !reference.match(/.*@\//);
                return !!reference.match(detector);
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

            var filter = this.options.filter || this.defaultOptions.filter;
            // compiler.plugin('done', () => {
            //     console.log('Hello World!', this.options);
            // });
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
            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$isRelativeToScri = _ref.isRelativeToScript,
                isRelativeToScript = _ref$isRelativeToScri === undefined ? false : _ref$isRelativeToScri;

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
        key: 'exportStyleguide',
        value: function exportStyleguide() {
            var content = [];
            var _this = this;
            var output = this.options.output || this.defaultOptions.output;
            var detector = this.options.detector || this.defaultOptions.detector;
            var markup1 = new RegExp(detector + 'markup\\\\r\\\\n', "gi");
            var markup2 = new RegExp(detector + 'markup\\\\n', "gi");
            readMultipleFiles(this.files).subscribe({
                next: function next(_ref2) {
                    var path = _ref2.path,
                        contents = _ref2.contents;

                    content.push(contents.toString('utf-8'));
                },
                complete: function complete() {
                    content.join('\n');
                    dss.parse(content, {}, function (parsedObject) {

                        var folderPath = path.resolve(process.cwd(), output).substring(0, path.resolve(process.cwd(), output).lastIndexOf("/"));
                        _this.mkDirByPathSync(folderPath);
                        parsedObject = JSON.parse(JSON.stringify(parsedObject).replace(markup1, '').replace(markup2, ''));
                        if (!fs.existsSync(path.resolve(process.cwd(), output)) || fs.existsSync(path.resolve(process.cwd(), output)) && JSON.stringify(parsedObject) !== JSON.stringify(_this.parsedObject)) {
                            _this.parsedObject = parsedObject;
                            fs.writeFile(path.resolve(process.cwd(), output), JSON.stringify(parsedObject, null, 4), function () {
                                console.log('📖 Updated Styleguide');
                            });
                        }
                    });
                }
            });
        }
    }, {
        key: 'tester',
        value: function tester() {
            return true;
        }
    }]);

    return DSSWebpackPlugin;
}();

module.exports = DSSWebpackPlugin;

//# sourceMappingURL=dss-webpack-plugin.js.map