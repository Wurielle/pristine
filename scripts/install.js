const project = process.argv[2];
if (!project) {
    throw new Error("No project type specified.");
}

const fs = require('fs');
const path = require('path');

const shell = require('shelljs');

const cwd = process.cwd();
const pristinePath = path.resolve(__dirname,'../');

const dependencies = require('./dependencies.json');
const actions = require('./actions.json');

const { execFileSync, echo, cd, copy, move, rm } = require('./pristine-script');

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
    constructor(exit = true) {
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
        let vueCliPlugins = [];
        if (dependencies['global']) {
            const vueCliPluginsGlobal = dependencies['global']['vue-cli-plugins'];
            if (typeof vueCliPluginsGlobal === 'object' && Array.isArray(vueCliPluginsGlobal)) {
                vueCliPlugins = [
                    ...vueCliPlugins,
                    ...vueCliPluginsGlobal
                ]
            }
        }
        if (dependencies[project]) {
            const vueCliPluginsProject = dependencies[project]['vue-cli-plugins'];
            if (typeof vueCliPluginsProject === 'object' && Array.isArray(vueCliPluginsProject)) {
                vueCliPlugins = [
                    ...vueCliPlugins,
                    ...vueCliPluginsProject
                ]
            }
        }
        vueCliPlugins.forEach(plugin => {
            execFileSync('vue', ['add', plugin], {interactive: true});
        });
        // -------------------------------------------------------------------------------------------------------------

        // Adding Dependencies -----------------------------------------------------------------------------------------
        echo('Adding Dependencies');
        let runtimeDependencies = [];
        let devDependencies = [];
        let bitDependencies = [];
        if (dependencies['global']) {
            const runtimeDependenciesGlobal = dependencies['global']['runtime'];
            if (typeof runtimeDependenciesGlobal === 'object' && Array.isArray(runtimeDependenciesGlobal)) {
                runtimeDependencies = [
                    ...runtimeDependencies,
                    ...runtimeDependenciesGlobal
                ]
            }
            const devDependenciesGlobal = dependencies['global']['dev'];
            if (typeof devDependenciesGlobal === 'object' && Array.isArray(devDependenciesGlobal)) {
                devDependencies = [
                    ...devDependencies,
                    ...devDependenciesGlobal
                ]
            }
            const bitDependenciesGlobal = dependencies['global']['bit'];
            if (typeof bitDependenciesGlobal === 'object' && Array.isArray(bitDependenciesGlobal)) {
                bitDependencies = [
                    ...bitDependencies,
                    ...bitDependenciesGlobal
                ]
            }
        }
        if (dependencies[project]) {
            const runtimeDependenciesProject = dependencies[project]['runtime'];
            if (typeof runtimeDependenciesProject === 'object' && Array.isArray(runtimeDependenciesProject)) {
                runtimeDependencies = [
                    ...runtimeDependencies,
                    ...runtimeDependenciesProject
                ]
            }
            const devDependenciesProject = dependencies[project]['dev'];
            if (typeof devDependenciesProject === 'object' && Array.isArray(devDependenciesProject)) {
                devDependencies = [
                    ...devDependencies,
                    ...devDependenciesProject
                ]
            }
            const bitDependenciesProject = dependencies[project]['bit'];
            if (typeof bitDependenciesProject === 'object' && Array.isArray(bitDependenciesProject)) {
                bitDependencies = [
                    ...bitDependencies,
                    ...bitDependenciesProject
                ]
            }
            if (runtimeDependencies.length) execFileSync('npm', ['i', ...runtimeDependencies]);
            if (devDependencies.length) execFileSync('npm', ['i', '-D', ...devDependencies]);
            execFileSync('bit', ['init']);
            bitDependencies.forEach((dep) => {
                execFileSync('bit', ['import', dep]);
            });
        }
        // -------------------------------------------------------------------------------------------------------------

        // Executing Actions -------------------------------------------------------------------------------------------
        echo('Copying Necessary Files');
        if (actions['global']) {
            if (actions['global'].copy) {
                copy(actions['global'].copy, state.pristinePath, state.cwd);
            }
            if (actions['global'].move) {
                move(actions['global'].move, state.cwd, state.cwd);
            }
            if (actions['global'].remove) {
                rm(actions['global'].remove, state.cwd);
            }
        }
        if (actions[project]) {
            if (actions[project].copy) {
                copy(actions[project].copy, state.pristinePath, state.cwd);
            }
            if (actions[project].move) {
                move(actions[project].move, state.cwd, state.cwd);
            }
            if (actions[project].remove) {
                rm(actions[project].remove, state.cwd);
            }
        }
        // -------------------------------------------------------------------------------------------------------------

        // Adding Scripts ----------------------------------------------------------------------------------------------
        echo('Adding Scripts');
        const npmAddScript = require('npm-add-script');
        if (actions['global']) {
            if (actions['global'].scripts) {
                Object.keys(actions['global'].scripts).forEach((key) => {
                    npmAddScript({key , value: actions['global'].scripts[key], force: true});
                });
            }
        }
        if (actions[project]) {
            if (actions[project].scripts) {
                Object.keys(actions[project].scripts).forEach((key) => {
                    npmAddScript({key , value: actions[project].scripts[key], force: true});
                });
            }
        }
        // -------------------------------------------------------------------------------------------------------------

        echo('All Done 🎉🎉🎉');
        if (exit) {
            shell.exit(1);
        }
    }
}

if (require.main === module) {
    // Called from CLI
    new SetupScript();
} else {
    // Called from require()
}