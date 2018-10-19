const fs = require('fs');
const path = require('path');

const readMultipleFiles = require('read-multiple-files');
const dss = require( 'dss' );

class DssWebpackPlugin {
    constructor(options) {
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

    initDSS(defaultOptions, options) {
        let filter = options.filter || defaultOptions.filter;
        let watch = options.watch || defaultOptions.watch;
        let detector = options.detector || defaultOptions.detector;
        detector = new RegExp(".*" + detector );
        dss.detector( function(line) {
            if (typeof line !== 'string') {
                return false;
            }
            const reference = line.split("\n\n").pop();
            // return !!reference.match(detector) && !reference.match(/.*@\//);
            return !!reference.match(detector);
        });

        dss.parser('section', function (i, line, block) {
            // Just returns the lines contents
            return line.split('>').map((item) => item.trim());
        });
        this.getFilesFromDir(path.dirname(watch), filter, (filepath) => {
            this.files.push(filepath);
        });
    }

    apply(compiler) {
        let filter = this.options.filter || this.defaultOptions.filter;
        // compiler.plugin('done', () => {
        //     console.log('Hello World!', this.options);
        // });
        compiler.plugin("watch-run", (compiler, done) => {
            const changedFiles = this.getChangedFiles(compiler);
            if (changedFiles.some((file) => filter.test(file))) {
                this.exportStyleguide();
            }
            done();
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
        const baseDir = isRelativeToScript ? __dirname : '.';
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

    exportStyleguide() {
        let content = [];
        let _this = this;
        let output = this.options.output || this.defaultOptions.output;
        let detector = this.options.detector || this.defaultOptions.detector;
        let markup1 = new RegExp(detector + 'markup\\\\r\\\\n', "gi");
        let markup2 = new RegExp(detector + 'markup\\\\n', "gi");
        readMultipleFiles(this.files).subscribe({
            next({path, contents}) {
                content.push(contents.toString('utf-8'));
            },
            complete() {
                content.join('\n');
                dss.parse(content, {}, (parsedObject) => {
                    _this.mkDirByPathSync(path.dirname(output));
                    parsedObject = JSON.parse(
                        JSON.stringify(parsedObject)
                            .replace(markup1, '')
                            .replace(markup2, '')
                    );
                    if(!fs.existsSync(output)
                        || fs.existsSync(output)
                        &&  JSON.stringify(parsedObject) !== JSON.stringify(_this.parsedObject)
                    ){
                        _this.parsedObject = parsedObject;
                        fs.writeFile(output, JSON.stringify(parsedObject, null, 4), function(){
                            console.log('📖 Updated Styleguide');
                        });
                    }
                });
            }
        });
    }
}

module.exports = DssWebpackPlugin;