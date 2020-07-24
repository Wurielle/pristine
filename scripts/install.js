#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const {pristinePath, pristineStatePath, defaultPristineState, cwd, cwdParsed, project, getJSONSync} = require('./utils/process');
const {shell, npmAddScript, vueBin} = require('./utils/modules');
const {execFileSync, echo, cd, copy, move, rm, writeFileSync, generate, commit, backup, concatenate} = require('./utils/commands');
echo('Installing Pristine Locally');
cd(cwd);
const libPath = {};
libPath[path.basename(path.dirname(__dirname))] = '.pristine/temp/lib';
copy(libPath, path.resolve(__dirname, '../../'), cwd);

const pristineState = getJSONSync(pristineStatePath, defaultPristineState);
const commonDependencies = getJSONSync(path.join(pristinePath, './scripts/configurations/dependencies.json'));
const commonActions = getJSONSync(path.join(pristinePath, './scripts/configurations/actions.json'));
const requiredCommands = [
    'npm',
    'git',
];

requiredCommands.forEach((command) => {
    if (!shell.which(command)) {
        shell.echo('This script requires: ' + command + '\n' + 'Please make sure you can use that command before continuing.');
        shell.exit(1);
    }
});

class Install {
    constructor(exit = true) {
        this.initGit();
        this.backupConcatenation();
        this.setNPMScopes();
        this.installGlobalDependencies();
        this.generateVueConfig();
        this.createVueCLIProject();
        this.installVueCLIPlugins();
        this.installDependencies();
        this.executeActions();
        this.addPackageScripts();
        this.isDone(exit);
    }

    initGit() {
        const gitIgnorePath = path.join(cwd, '.gitignore')
        execFileSync('git', ['init']);

        if (fs.existsSync(gitIgnorePath)) {
            try {
                let data = fs.readFileSync(gitIgnorePath, 'utf8');
                if (data.indexOf('node_modules') < 0) {
                    data += '\n' + 'node_modules';
                    fs.writeFileSync(gitIgnorePath, data);
                }
            } catch (err) {
                throw err;
            }
        } else {
            writeFileSync(path.join(cwd, '.gitignore'), `
            node_modules
        `.trim())
        }
    }


    backupConcatenation() {
        if (commonActions) {
            if (commonActions.concatenate) {
                commonActions.concatenate.forEach((filePath) =>backup(path.join(cwd, filePath), false));
            }
        }
    }

    setNPMScopes() {
        const npmrcFile = path.join(cwd, '.npmrc');
        const npmrcScopes = commonDependencies['.npmrc'];
        if (fs.existsSync(npmrcFile)) {
            try {
                const data = fs.readFileSync(npmrcFile, 'utf8');
                const content = this.getNPMRCContent(npmrcScopes, data);
                return fs.writeFileSync(npmrcFile, content);
            } catch (err) {
                throw err;
            }
        }
        try {
            const content = this.getNPMRCContent(npmrcScopes);
            return fs.writeFileSync(npmrcFile, content);
        } catch (err) {
            throw err;
        }
    }

    getNPMRCContent(scopes, content = '') {
        const scopesIsArray = scopes && typeof scopes === 'object' && Array.isArray(scopes);
        if (scopesIsArray) {
            scopes.forEach((scope) => {
                if (content.indexOf(scope) < 0) {
                    content += scope + '\n';
                }
            });
        }
        return content;
    }

    installGlobalDependencies() {
        if (!this.hasCheckpoint('installGlobalDependencies')) {
            echo('Installing Global Dependencies');
            cd(cwd);
            execFileSync('npm', ['i', '-g', '@vue/cli']);
            this.addCheckpoint('installGlobalDependencies');
        }
    }

    generateVueConfig() {
        if (!this.hasCheckpoint('generateVueConfig')) {
            echo('Creating Vue Config File');
            cd(cwd);
            writeFileSync(path.join(cwd, 'vue.config.js'), `
                module.exports = {
                    lintOnSave: false,
                }
            `)
            this.addCheckpoint('generateVueConfig');
        }
    }

    createVueCLIProject() {
        if (!this.hasCheckpoint('createVueCLIProject')) {
            echo('Creating a Vue CLI Project');
            cd(path.resolve(cwd, '../'));
            execFileSync('node', [vueBin, 'create', cwdParsed.name], {interactive: true, autoSuffix: false});
            this.addCheckpoint('createVueCLIProject');
        }
    }

    installVueCLIPlugins() {
        if (!this.hasCheckpoint('installVueCLIPlugins')) {
            echo('Adding Vue CLI Plugins');
            cd(cwd);
            let vueCliPlugins = [];
            if (commonDependencies) {
                const vueCliPluginsGlobal = commonDependencies['vue-cli-plugins'];
                if (typeof vueCliPluginsGlobal === 'object' && Array.isArray(vueCliPluginsGlobal)) {
                    vueCliPlugins = [
                        ...vueCliPlugins,
                        ...vueCliPluginsGlobal
                            .filter((dep) => typeof dep === 'string' || typeof dep === 'object' && dep.for.includes(project))
                            .map((dep) => typeof dep === 'string' ? dep : dep.name),
                    ]
                }
            }
            vueCliPlugins.forEach(plugin => {
                if (!this.hasCheckpoint(plugin)) {
                    execFileSync('node', [vueBin, 'add', plugin], {interactive: true, autoSuffix: false});
                    this.addCheckpoint(plugin);
                }
            });
            this.addCheckpoint('installVueCLIPlugins');
        }
    }

    installDependencies() {
        if (!this.hasCheckpoint('installDependencies')) {
            echo('Adding Dependencies');
            cd(cwd);
            let runtimeDependencies = [];
            let devDependencies = [];
            if (commonDependencies) {
                const runtimeDependenciesGlobal = commonDependencies['dependencies'];
                if (typeof runtimeDependenciesGlobal === 'object' && Array.isArray(runtimeDependenciesGlobal)) {
                    runtimeDependencies = [
                        ...runtimeDependencies,
                        ...runtimeDependenciesGlobal
                            .filter((dep) => typeof dep === 'string' || typeof dep === 'object' && dep.for.includes(project))
                            .map((dep) => typeof dep === 'string' ? dep : dep.name),
                    ]
                }
                const devDependenciesGlobal = commonDependencies['devDependencies'];
                if (typeof devDependenciesGlobal === 'object' && Array.isArray(devDependenciesGlobal)) {
                    devDependencies = [
                        ...devDependencies,
                        ...devDependenciesGlobal
                            .filter((dep) => typeof dep === 'string' || typeof dep === 'object' && dep.for.includes(project))
                            .map((dep) => typeof dep === 'string' ? dep : dep.name),
                    ]
                }
            }
            if (runtimeDependencies.length) execFileSync('npm', ['i', ...runtimeDependencies]);
            if (devDependencies.length) execFileSync('npm', ['i', '-D', ...devDependencies]);
            this.addCheckpoint('installDependencies');
        }
    }

    executeActions() {
        if (!this.hasCheckpoint('executeActions')) {
            echo('Copying Necessary Files');
            cd(cwd);
            if (commonActions) {
                if (commonActions.move) {
                    move(commonActions.move, cwd, cwd);
                }
                if (commonActions.copy) {
                    copy(commonActions.copy, pristinePath, cwd);
                }
                if (commonActions.generate) {
                    generate(commonActions.generate, pristinePath, cwd);
                }
                if (commonActions.remove) {
                    rm(commonActions.remove, cwd);
                }
                if (commonActions.concatenate) {
                    concatenate(commonActions.concatenate);
                }
            }
            this.addCheckpoint('executeActions');
        }
    }

    addPackageScripts() {
        if (!this.hasCheckpoint('addPackageScripts')) {
            echo('Adding Scripts');
            cd(cwd);
            if (commonActions) {
                if (commonActions.scripts) {
                    Object.keys(commonActions.scripts).forEach((key) => {
                        const script = typeof commonActions.scripts[key] === 'string' ? commonActions.scripts[key] : commonActions.scripts[key][project] || commonActions.scripts[key].default;
                        if (script) {
                            npmAddScript({key, value: script, force: true});
                        }
                    });
                }
            }
            this.addCheckpoint('addPackageScripts');
        }
    }

    isDone(exit = true) {
        echo('All Done 🎉🎉🎉');
        if (fs.existsSync(pristineStatePath)) {
            fs.unlinkSync(pristineStatePath);
        }
        if (fs.existsSync(path.join(cwd, '.pristine/temp'))) {
            fs.rmdirSync(path.join(cwd, '.pristine/temp'), { recursive: true });
        }
        if (exit) {
            shell.exit(1);
        }
    }

    hasCheckpoint(checkpointName) {
        return pristineState.checkpoints.includes(checkpointName);
    }

    addCheckpoint(checkpointName) {
        cd(cwd);
        pristineState.checkpoints.push(checkpointName);
        fs.writeFileSync(pristineStatePath, JSON.stringify(pristineState));
        commit('build: Pristine - Checkpoint (' + checkpointName + ')');
    }
}

if (require.main === module) {
    // Called from CLI
    new Install();
} else {
    // Called from require()
}

module.exports = Install;
