const child_process = require('child_process');
const cwd = process.cwd();
const path = require('path');
const fs = require('fs');

const packageJsonPath = path.join(cwd, 'package.json');
if (!fs.existsSync(packageJsonPath)) fs.writeFileSync(packageJsonPath, JSON.stringify({}));
// install script dependencies locally and point to their path since regular requires won't work at runtime
child_process.execFileSync('npm.cmd', ['i', '-D', 'shelljs', 'npm-add-script', 'global-modules'], {interactive: true});

const globalModules = require(path.join(cwd, 'node_modules/global-modules'));
const shell = require(path.join(cwd, 'node_modules/shelljs'));
const npmAddScript = require(path.join(cwd, 'node_modules/npm-add-script'));
const vueBin = path.join(globalModules, '@vue/cli/bin/vue.js');
const bitBin = path.join(globalModules, 'bit-bin/bin/bit.js');

module.exports = { shell, npmAddScript, vueBin, bitBin };
