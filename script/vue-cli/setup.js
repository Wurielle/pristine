const fs = require('fs');
const path = require('path');

const shell = require('shelljs');

const cwd = process.cwd();
const pristinePath = path.resolve(__dirname,'../../');
const filesToCopy = require('./copy.json');

const { execFileSync, echo, cd, copy } = require('../pristine-script');

const state = {
    __dirname,
    pristinePath,
    cwd,
    cwdParsed: path.parse(cwd)
};

const requiredCommands = [
    'git',
    'npm',
];

requiredCommands.forEach((command) => {
    if (!shell.which(command)) {
        shell.echo('This script requires: '+command+'\n'+'Please make sure you can use that command before continuing.');
        shell.exit(1);
    }
});

class SetupScript {
    constructor() {
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

        // Adding Vue CLI Plugins --------------------------------------------------------------------------------------
        echo('Adding Vue CLI Plugins');
        execFileSync('vue', ['add', 'vue-cli-plugin-build-watch'], {interactive: true});
        execFileSync('vue', ['add', 'element'], {interactive: true});
        execFileSync('vue', ['add', 'storybook'], {interactive: true});
        // -------------------------------------------------------------------------------------------------------------

        // Adding Workflow Dependencies --------------------------------------------------------------------------------
        echo('Adding Workflow Dependencies');
        const workflowDevDeps = [
            'animate.css',
            'ionicons',
            'tailwindcss',
            'minimist',
            'postcss-pxtorem',
            '@bit/wurielle.pristine.webpack.dss-plugin',
            '@bit/wurielle.pristine.webpack.json-sass-plugin',
            '@bit/wurielle.pristine.vue-components.dss-styleguide',
        ];
        execFileSync('npm', ['i', '-D', ...workflowDevDeps]);
        // -------------------------------------------------------------------------------------------------------------

        // Adding Dev Dependencies (Optional) --------------------------------------------------------------------------
        echo('Adding Dev Dependencies (Optional)');
        const developmentDevDeps = [
            'lodash',
            'axios',
        ];
        execFileSync('npm', ['i', '-D', ...developmentDevDeps]);
        // -------------------------------------------------------------------------------------------------------------

        // Copying Necessary Files -------------------------------------------------------------------------------------
        echo('Copying Necessary Files');
        copy(filesToCopy, state.pristinePath, state.cwd);
        // -------------------------------------------------------------------------------------------------------------

        echo('All Done 🎉🎉🎉');
        shell.exit(1);
    }
}

if (require.main === module) {
    // Called from CLI
    new SetupScript();
} else {
    // Called from require()
}