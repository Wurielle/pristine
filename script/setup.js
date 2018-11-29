const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const shell = require('shelljs');

const cwd = process.cwd();
const pristinePath = path.resolve(__dirname,'../');
const state = {
    __dirname,
    pristinePath,
    cwd,
    cwdParsed: path.parse(cwd)
};

let command;

shell.echo(state);

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

if (!shell.which('npm')) {
    shell.echo('Sorry, this script requires npm');
    shell.exit(1);
}

// Update Pristine -----------------------------------------------------------------------------------------------------
shell.echo('Updating Pristine');
shell.cd(state.pristinePath);
if (shell.exec('git pull').code !== 0) {
    shell.echo('Error: git pull failed');
    shell.exit(1);
}
shell.cd(state.cwd);
// ---------------------------------------------------------------------------------------------------------------------

// Installing Global Dependencies --------------------------------------------------------------------------------------
shell.echo('Installing Global Dependencies');
executeCommandSync('npm config set \'@bit:registry\' https://node.bitsrc.io');
executeCommandSync('npm install -g @vue/cli');
executeCommandSync('npm i -g bit-bin');
// ---------------------------------------------------------------------------------------------------------------------

// Creating a Vue CLI Project ------------------------------------------------------------------------------------------
shell.echo('Creating a Vue CLI Project');
shell.cd(path.resolve(state.cwd, '../'));
child_process.execFileSync('vue.cmd', ['create', state.cwdParsed.name], {stdio: 'inherit'});
shell.cd(state.cwd);
// ---------------------------------------------------------------------------------------------------------------------

// Adding Vue CLI Plugins ----------------------------------------------------------------------------------------------
shell.echo('Adding Vue CLI Plugins');
child_process.execFileSync('vue.cmd', ['add', 'vue-cli-plugin-build-watch'], {stdio: 'inherit'});
child_process.execFileSync('vue.cmd', ['add', 'element'], {stdio: 'inherit'});
child_process.execFileSync('vue.cmd', ['add', 'storybook'], {stdio: 'inherit'});
// ---------------------------------------------------------------------------------------------------------------------

// Adding Workflow Dependencies ----------------------------------------------------------------------------------------
shell.echo('Adding Workflow Dependencies');
child_process.execFileSync('npm.cmd', ['i', '-D', 'tailwindcss'], {stdio: 'inherit'});
child_process.execFileSync('npm.cmd', ['i', '-D', 'minimist'], {stdio: 'inherit'});
child_process.execFileSync('npm.cmd', ['i', '-D', 'postcss-pxtorem'], {stdio: 'inherit'});
child_process.execFileSync('npm.cmd', ['i', '-D', '@bit/wurielle.pristine.webpack.dss-plugin'], {stdio: 'inherit'});
child_process.execFileSync('npm.cmd', ['i', '-D', '@bit/wurielle.pristine.webpack.json-sass-plugin'], {stdio: 'inherit'});
child_process.execFileSync('npm.cmd', ['i', '-D', '@bit/wurielle.pristine.vue-components.dss-styleguide'], {stdio: 'inherit'});
// ---------------------------------------------------------------------------------------------------------------------

// Adding Dev Dependencies (Optional) ----------------------------------------------------------------------------------
shell.echo('Adding Dev Dependencies (Optional)');
child_process.execFileSync('npm.cmd', ['i', '-D', 'lodash'], {stdio: 'inherit'});
child_process.execFileSync('npm.cmd', ['i', '-D', 'axios'], {stdio: 'inherit'});
// ---------------------------------------------------------------------------------------------------------------------

shell.exit(1);

// Functions -----------------------------------------------------------------------------------------------------------
function executeCommandSync(command) {
    if (shell.exec(command).code !== 0) {
        shell.echo('Error: '+command+' failed');
        shell.exit(1);
    }
}
// ---------------------------------------------------------------------------------------------------------------------