/**
 * @name DSSWebpackPlugin
 * @description Unofficial DSS Webpack Plugin
 * @param {Object} options
 * @param {string} [options.filter=/\.s(c|a)ss/] - Files to be matched.
 * @param {string} [options.watch=./src] - Directory to watch that includes files matching the filter pattern.
 * @param {string} [options.output=./styleguide.json] - JSON Output file.
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
 *          }),
 *      ]
 *  }
 */
const fs = require('fs');
const path = require('path');

const readMultipleFiles = require('read-multiple-files');
const dss = require('dss');

class DSSPlugin {
    constructor(options = {}) {
        this.files = [];
        this.parsedObject = null;
        this.defaultOptions = {
            filter: /\.s(c|a)ss/,
            output: './styleguide.json',
            watch: './',
            detector: '@',
            detectorFilter: [
                'media',
                'import',
                'tailwind',
                'apply',
                'variants',
                'responsive',
                'screen'
            ]
        };
        this.options = {...this.defaultOptions, ...options};
        this.initDSS();
    }

    initDSS() {
        let { filter, watch, detector, detectorFilter } = this.options;
        const pattern = new RegExp(".*" + detector );
        const unmatch = new RegExp(".*@(" + detectorFilter.join("|") + ")");
        dss.detector( function(line) {
            if (typeof line !== 'string') {
                return false;
            }
            const reference = line.split("\n\n").pop();
            return !!reference.match(pattern) && !reference.match(unmatch);
        });

        dss.parser('section', function (i, line, block) {
            // Just returns the lines contents
            return line.split('>').map((item) => item.trim());
        });
        this.getFilesFromDir(path.resolve(process.cwd(), watch), filter, (filepath) => {
            this.files.push(filepath);
        });
    }

    apply(compiler) {
        let { filter } = this.options;
        compiler.plugin("watch-run", (compiler, done) => {
            const changedFiles = this.getChangedFiles(compiler);
            if (changedFiles.some((file) => filter.test(file))) {
                this.exportStyleguide();
            }
            done();
        });
    }

    exportStyleguide() {
        let content = [];
        let _this = this;
        let { output, detector } = this.options;
        let outputFullPath = path.resolve(process.cwd(), output);
        let markup1 = new RegExp(detector + 'markup\\\\r\\\\n', "gi");
        let markup2 = new RegExp(detector + 'markup\\\\n', "gi");
        readMultipleFiles(this.files).subscribe({
            next({path, contents}) {
                content.push(contents.toString('utf-8'));
            },
            complete() {
                content.join('\n');
                dss.parse(content, {}, (parsedObject) => {
                    parsedObject.blocks = parsedObject.blocks.sort((a, b) => {
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                    });
                    const folderPath = outputFullPath.substring(0, outputFullPath.lastIndexOf("/"));
                    _this.mkDirByPathSync(folderPath);
                    parsedObject = JSON.parse(
                        JSON.stringify(parsedObject)
                            .replace(markup1, '')
                            .replace(markup2, '')
                    );
                    if(!fs.existsSync(outputFullPath)
                        || fs.existsSync(outputFullPath)
                        &&  JSON.stringify(parsedObject) !== JSON.stringify(_this.parsedObject)
                    ){
                        _this.parsedObject = parsedObject;
                        fs.writeFile(outputFullPath, JSON.stringify(parsedObject, null, 4), function(){
                            console.log('\n📖 Styleguide Updated\n');
                        });
                    }
                });
            }
        });
    }

    getChangedFiles(compiler) {
        const { watchFileSystem } = compiler;
        const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

        return Object.keys(watcher.mtimes);
    }

    getFilesFromDir(startPath, filter, callback) {
        if (!fs.existsSync(startPath)){
            console.log("no dir ", startPath);
            return;
        }
        let files=fs.readdirSync(startPath);
        for(let i=0;i<files.length;i++){
            let filename=path.join(startPath,files[i]);
            let stat = fs.lstatSync(filename);
            if (stat.isDirectory()){
                this.getFilesFromDir(filename, filter, callback);
            }
            else if (filter.test(filename)) callback(filename);
        }
    }

    mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
        const sep = path.sep;
        const initDir = path.isAbsolute(targetDir) ? sep : '';
        const baseDir = isRelativeToScript ? process.cwd() : '.';
        return targetDir.split(sep).reduce((parentDir, childDir) => {
            const curDir = path.resolve(baseDir, parentDir, childDir);
            try {
                fs.mkdirSync(curDir);
            } catch (err) {
                if (err.code === 'EEXIST') { // curDir already exists!
                    return curDir;
                }

                // To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
                if (err.code === 'ENOENT') { // Throw the original parentDir error on curDir `ENOENT` failure.
                    throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
                }

                const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
                if (!caughtErr || caughtErr && targetDir === curDir) {
                    throw err; // Throw if it's just the last created dir.
                }
            }
            return curDir;
        }, initDir);
    }

    tester() {
        return true
    }
}

module.exports = DSSPlugin;