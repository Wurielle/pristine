const PristineScript = require('./pristine-script');

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

// shell.echo(state);

if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    shell.exit(1);
}

if (!shell.which('npm')) {
    shell.echo('Sorry, this script requires npm');
    shell.exit(1);
}

if (!shell.which('vue')) {
    shell.echo('Sorry, this script requires vue-cli');
    shell.exit(1);
}

class SetupScript extends PristineScript {
    constructor() {
        super();
        const { execFileSync, echo, cd } = this;
        // Update Pristine ---------------------------------------------------------------------------------------------
        echo('Updating Pristine');
        cd(state.pristinePath);
        execFileSync('git', ['pull']);
        cd(state.cwd);
        // -------------------------------------------------------------------------------------------------------------

        // Installing Global Dependencies ------------------------------------------------------------------------------
        echo('Installing Global Dependencies');
        execFileSync('npm', ['config', 'set \'@bit:registry\' https://node.bitsrc.io']);
        execFileSync('npm', ['i', '-g', '@vue/cli']);
        execFileSync('npm', ['i', '-g', 'bit-bin']);
        // -------------------------------------------------------------------------------------------------------------

        // Creating a Vue CLI Project ----------------------------------------------------------------------------------
        echo('Creating a Vue CLI Project');
        cd(path.resolve(state.cwd, '../'));
        execFileSync('vue', ['create', state.cwdParsed.name], {interactive: true});
        cd(state.cwd);
        // -------------------------------------------------------------------------------------------------------------

        // Adding Vue CLI Plugins ----------------------------------------------------------------------------------------------
        echo('Adding Vue CLI Plugins');
        execFileSync('vue', ['add', 'vue-cli-plugin-build-watch'], {interactive: true});
        execFileSync('vue', ['add', 'element'], {interactive: true});
        execFileSync('vue', ['add', 'storybook'], {interactive: true});
        // ---------------------------------------------------------------------------------------------------------------------

        // Adding Workflow Dependencies --------------------------------------------------------------------------------
        echo('Adding Workflow Dependencies');
        const workflowDevDeps = [
            'tailwindcss',
            'minimist',
            'postcss-pxtorem',
            '@bit/wurielle.pristine.webpack.dss-plugin',
            '@bit/wurielle.pristine.webpack.json-sass-plugin',
            '@bit/wurielle.pristine.vue-components.dss-styleguide',
        ];
        execFileSync('npm', ['i', '-D', ...workflowDevDeps]);
        // ------------------------------------------------------------------------------------------------------------

        // Adding Dev Dependencies (Optional) --------------------------------------------------------------------------
        echo('Adding Dev Dependencies (Optional)');
        const developmentDevDeps = [
            'lodash',
            'axios',
        ];
        execFileSync('npm', ['i', '-D', ...developmentDevDeps]);
        // -------------------------------------------------------------------------------------------------------------

        echo('All Done 🎉🎉🎉');
        shell.exit(1);
    }
}

new SetupScript();