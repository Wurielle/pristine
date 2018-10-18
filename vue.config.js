const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackPluginHash = require('webpack-plugin-hash');
const argv = require('minimist')(process.argv.slice(2));

const jsonSass = require('json-sass');
const readMultipleFiles = require('read-multiple-files');
const dss = require( 'dss' );
const themeJsonPath = './config/theme.js';
const themeSassExportPath = './config/theme.scss';

function getFilesFromDir(startPath, filter, callback) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)){
        console.log("no dir ", startPath);
        return;
    }

    let files=fs.readdirSync(startPath);
    for(let i=0;i<files.length;i++){
        let filename=path.join(startPath,files[i]);
        let stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            getFilesFromDir(filename, filter, callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    }
}

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
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

dss.detector( function(line) {
    if (typeof line !== 'string') {
        return false;
    }
    const reference = line.split("\n\n").pop();
    return !!reference.match(/.*_@/) && !reference.match(/.*@\//);
});

dss.parser('section', function (i, line, block) {
    // Just returns the lines contents
    return line.split('>').map((item) => item.trim());
});

let files = [];
function exportStyleguide() {
    let content = [];
    files = [];
    getFilesFromDir('./src/',/\.s(c|a)ss/, function(filepath){
        files.push(filepath)
    });
    readMultipleFiles(files).subscribe({
        next({path, contents}) {
            content.push(contents.toString('utf-8'));
        },
        complete(){
            content.join('\n');
            dss.parse(content, {}, function(parsedObject) {
                mkDirByPathSync('src/styleguide/');
                parsedObject = JSON.parse(
                    JSON.stringify(parsedObject)
                    .replace(/_@markup\\r\\n/gi,'')
                    .replace(/_@markup\\n/gi,'')
                );
                fs.writeFile('src/styleguide/styleguide.json', JSON.stringify(parsedObject, null, 4), function(){
                    console.log('📖 Updated Styleguide');
                });
            });
        }
    });
}
exportStyleguide();
files.forEach(function(file){
    fs.watchFile(path.join(file), exportStyleguide);
});

if (fs.existsSync(themeJsonPath)) {
    let theme = require(themeJsonPath);
    function getSass(object){
        return "$theme:"+jsonSass.convertJs(JSON.parse(JSON.stringify(object).replace(/:":"/g, ":\"\\\\:\"")))+";";
    }
    let themeSASS = getSass(theme);
    fs.writeFileSync(themeSassExportPath, themeSASS);
    fs.watchFile(path.join(themeJsonPath), () => {
        let newTheme = require(themeJsonPath);
        themeSASS = getSass(newTheme);
        fs.writeFileSync(themeSassExportPath, themeSASS);
    });
}
module.exports = {
    baseUrl: './',
    css: {
        loaderOptions: {
            sass: {
                functions: {

                }
            }
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@config':  path.resolve(__dirname, 'config'),
            }
        },
        plugins:[
            new webpack.DefinePlugin({
                // 'API_AUTH_USERNAME': JSON.stringify(argv.apiAuthUsername.trim()),
                // 'API_AUTH_PASSWORD': JSON.stringify(argv.apiAuthPassword.trim()),
                // 'SERVICE_URL': JSON.stringify(argv.domain.trim())
            }),
        ]
    }
};