const fs = require('fs');
const path = require('path');

const project = process.argv[2];
if (!project) {
    throw new Error("No project type specified.");
}

const { pristinePath, dependencies, actions, cwd, cwdParsed } = require('./utils/process');
const { shell, npmAddScript, vueBin, bitBin } = require('./utils/modules');
const { execFileSync, echo, cd, copy, move, rm } = require('./utils/commands');

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

class Install {
    constructor(exit = true) {
        this.updatePristine();
        this.installGlobalDependencies();
        this.createVueCLIProject();
        this.installVueCLIPlugins();
        this.installDependencies();
        this.executeActions();
        this.addPackageScripts();
        echo('All Done 🎉🎉🎉');
        if (exit) {
            shell.exit(1);
        }
    }

    updatePristine() {
        echo('Updating Pristine');
        cd(pristinePath);
        execFileSync('git', ['pull']);
    }

    installGlobalDependencies() {
        echo('Installing Global Dependencies');
        cd(cwd);
        execFileSync('npm', ['config', 'set \'@bit:registry\' https://node.bit.dev']);
        execFileSync('npm', ['i', '-g', '@vue/cli']);
        execFileSync('npm', ['i', '-g', 'bit-bin']);
    }

    createVueCLIProject() {
        echo('Creating a Vue CLI Project');
        cd(path.resolve(cwd, '../'));
        execFileSync('node', [vueBin, 'create', cwdParsed.name], {interactive: true, autoSuffix: false});
    }

    installVueCLIPlugins() {
        echo('Adding Vue CLI Plugins');
        cd(cwd);
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
            execFileSync('node', [vueBin, 'add', plugin], {interactive: true, autoSuffix: false});
        });
    }

    installDependencies() {
        echo('Adding Dependencies');
        cd(cwd);
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
            execFileSync('node', [bitBin, 'init'], {interactive: true, autoSuffix: false});
            bitDependencies.forEach((dep) => {
                execFileSync('node', [bitBin, 'import', dep], {interactive: true, autoSuffix: false});
            });
        }
    }

    executeActions() {
        echo('Copying Necessary Files');
        cd(cwd);
        if (actions['global']) {
            if (actions['global'].copy) {
                copy(actions['global'].copy, pristinePath, cwd);
            }
            if (actions['global'].move) {
                move(actions['global'].move, cwd, cwd);
            }
            if (actions['global'].remove) {
                rm(actions['global'].remove, cwd);
            }
        }
        if (actions[project]) {
            if (actions[project].copy) {
                copy(actions[project].copy, pristinePath, cwd);
            }
            if (actions[project].move) {
                move(actions[project].move, cwd, cwd);
            }
            if (actions[project].remove) {
                rm(actions[project].remove, cwd);
            }
        }
    }

    addPackageScripts() {
        echo('Adding Scripts');
        cd(cwd);
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
    }
}

if (require.main === module) {
    // Called from CLI
    new Install();
} else {
    // Called from require()
}
