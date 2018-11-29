const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const shell = require('shelljs');

class PristineScript {
    constructor() {

    }

    execFileSync(file, args, options = {}) {
        options = {
            interactive: false,
            cpOptions: {stdio: 'inherit'},
            shellOptions: {},
            ...options,
        };
        let command = file+' '+args.join(' ');
        shell.echo('💠 Executing: '+command);
        if(options.interactive) {
            if(process.platform === "win32") {
                file += '.cmd';
            }
            child_process.execFileSync(file, args, options.cpOptions);
        } else {
            if (shell.exec(command, options.shellOptions).code !== 0) {
                shell.echo('Error: '+command+' failed');
                shell.exit(1);
            }
        }
    }

    echo(message) {
        return shell.echo('\n💠 🔔 '+message);
    }

    cd (path) {
        shell.echo('💠 Current Directory: '+path);
        shell.cd(path);
    }
}

module.exports = PristineScript;