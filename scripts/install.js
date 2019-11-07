#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const project = process.argv[2];
if (!project) {
    throw new Error("No project type specified.");
}

const { pristinePath, cwd, cwdParsed, getJSONSync } = require('./utils/process');
const { shell, npmAddScript, vueBin, bitBin } = require('./utils/modules');
const { execFileSync, echo, cd, copy, move, rm } = require('./utils/commands');
echo('Installing Pristine Locally');
cd(cwd);
const libPath = {};
libPath[path.basename(path.dirname(__dirname))] = '.pristine/temp/lib';
copy(libPath, path.resolve(__dirname,'../../'), cwd);
const commonDependencies = getJSONSync(path.join(pristinePath, './scripts/configurations/' + 'all' + '/dependencies.json'));
const commonActions = getJSONSync(path.join(pristinePath, './scripts/configurations/' + 'all' + '/actions.json'));
const projectDependencies = getJSONSync(path.join(pristinePath, './scripts/configurations/' + project + '/dependencies.json'));
const projectActions = getJSONSync(path.join(pristinePath, './scripts/configurations/' + project + '/actions.json'));
const requiredCommands = [
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
        if (commonDependencies) {
            const vueCliPluginsGlobal = commonDependencies['vue-cli-plugins'];
            if (typeof vueCliPluginsGlobal === 'object' && Array.isArray(vueCliPluginsGlobal)) {
                vueCliPlugins = [
                    ...vueCliPlugins,
                    ...vueCliPluginsGlobal
                ]
            }
        }
        if (projectDependencies) {
            const vueCliPluginsProject = projectDependencies['vue-cli-plugins'];
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
        if (commonDependencies) {
            const runtimeDependenciesGlobal = commonDependencies['dependencies'];
            if (typeof runtimeDependenciesGlobal === 'object' && Array.isArray(runtimeDependenciesGlobal)) {
                runtimeDependencies = [
                    ...runtimeDependencies,
                    ...runtimeDependenciesGlobal
                ]
            }
            const devDependenciesGlobal = commonDependencies['devDependencies'];
            if (typeof devDependenciesGlobal === 'object' && Array.isArray(devDependenciesGlobal)) {
                devDependencies = [
                    ...devDependencies,
                    ...devDependenciesGlobal
                ]
            }
            const bitDependenciesGlobal = commonDependencies['bit'];
            if (typeof bitDependenciesGlobal === 'object' && Array.isArray(bitDependenciesGlobal)) {
                bitDependencies = [
                    ...bitDependencies,
                    ...bitDependenciesGlobal
                ]
            }
        }
        if (projectDependencies) {
            const runtimeDependenciesProject = projectDependencies['dependencies'];
            if (typeof runtimeDependenciesProject === 'object' && Array.isArray(runtimeDependenciesProject)) {
                runtimeDependencies = [
                    ...runtimeDependencies,
                    ...runtimeDependenciesProject
                ]
            }
            const devDependenciesProject = projectDependencies['devDependencies'];
            if (typeof devDependenciesProject === 'object' && Array.isArray(devDependenciesProject)) {
                devDependencies = [
                    ...devDependencies,
                    ...devDependenciesProject
                ]
            }
            const bitDependenciesProject = projectDependencies['bit'];
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
        if (commonActions) {
            if (commonActions.copy) {
                copy(commonActions.copy, pristinePath, cwd);
            }
            if (commonActions.move) {
                move(commonActions.move, cwd, cwd);
            }
            if (commonActions.remove) {
                rm(commonActions.remove, cwd);
            }
        }
        if (projectActions) {
            if (projectActions.copy) {
                copy(projectActions.copy, pristinePath, cwd);
            }
            if (projectActions.move) {
                move(projectActions.move, cwd, cwd);
            }
            if (projectActions.remove) {
                rm(projectActions.remove, cwd);
            }
        }
    }

    addPackageScripts() {
        echo('Adding Scripts');
        cd(cwd);
        if (commonActions) {
            if (commonActions.scripts) {
                Object.keys(commonActions.scripts).forEach((key) => {
                    npmAddScript({key , value: commonActions.scripts[key], force: true});
                });
            }
        }
        if (projectActions) {
            if (projectActions.scripts) {
                Object.keys(projectActions.scripts).forEach((key) => {
                    npmAddScript({key , value: projectActions.scripts[key], force: true});
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
