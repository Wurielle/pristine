const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const {shell} = require('./modules');
const {cwd, project} = require('./process');
const date = new Date();
const rendererOptions = {
    project,
}
const backupDir = path.join(
  cwd,
  '.pristine/backup',
  [date.getFullYear(), (date.getMonth() + 1), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]
    .reduce((previousValue, currentValue) => previousValue + currentValue.toString(), '')
);

const backup = (target) => {
    if (fs.existsSync(target)) {
        const backupTarget = target.replace(cwd, backupDir);
        console.log('💠 Backing up "'
            + target.replace(cwd, '').replace(/\\/g, '/')
            + '" in "'
            + backupTarget.replace(cwd, '').replace(/\\/g, '/')
            +'"'
        );
        mkdir(backupTarget);
        if (isFile(backupTarget)) {
            shell.cp('-R', target, backupTarget);
        } else {
            shell.cp('-R', path.join(target, '*'), backupTarget);
        }
    }
};

const isFile = (string) => {
    const re = /(?:\.([^.]+))?$/;
    return !!re.exec(string)[1];
};

const isFolder = (string) => {
    return !isFile(string);
};

const execFileSync = (file, args, options = {}) => {
    options = {
        interactive: false,
        cpOptions: {stdio: 'inherit'},
        shellOptions: {},
        autoSuffix: true,
        ...options,
    };
    let command = file + ' ' + args.join(' ');
    shell.echo('💠 Executing: ' + command);
    if (options.interactive) {
        if (process.platform === "win32" && options.autoSuffix) {
            file += '.cmd';
        }
        child_process.execFileSync(file, args, options.cpOptions);
    } else {
        if (shell.exec(command, options.shellOptions).code !== 0) {
            shell.echo('Error: ' + command + ' failed');
            shell.exit(1);
        }
    }
};

const mkdir = (dirPath) => {
    const computedPath = isFile(dirPath)
        ? path.parse(dirPath).dir
        : path.join(path.parse(dirPath).dir, path.parse(dirPath).name);
    if (!fs.existsSync(computedPath)) {
        console.log('💠 Creating Directory: ' + computedPath);
        shell.mkdir('-p', computedPath);
    }
};

const echo = (message) => {
    return shell.echo('\n💠 ✨  ' + message);
};

const cd = (path) => {
    shell.echo('💠 Current Directory: ' + path);
    shell.cd(path);
};

const writeFileSync = (destination, content) => {
    return fs.writeFileSync(destination, content);
}

const generate = (files, from, to) => {
    Object.keys(files).forEach(function (key) {
        const target = typeof files[key] === 'string' ? files[key] : files[key][project] || files[key].default;
        if (target) {
            let completeFrom = path.resolve(from, key);
            let completeTo = path.resolve(to, target);
            const renderer = require(completeFrom);
            if (fs.existsSync(completeFrom)) {
                backup(completeTo);
                mkdir(completeTo);
                writeFileSync(completeTo, renderer(rendererOptions))
            }
        }
    });
};

const copy = (files, from, to) => {
    Object.keys(files).forEach(function (key) {
        const target = typeof files[key] === 'string' ? files[key] : files[key][project] || files[key].default;
        if (target) {
            let completeFrom = path.resolve(from, key);
            let completeTo = path.resolve(to, target);
            if (fs.existsSync(completeFrom)) {
                backup(completeTo);
                mkdir(completeTo);
                if (isFile(completeTo)) {
                    shell.cp('-R', completeFrom, completeTo);
                } else {
                    shell.cp('-R', path.join(completeFrom, '*'), completeTo);
                }
            }
        }
    });
};

const move = (files, from, to) => {
    Object.keys(files).forEach(function (key) {
        const target = typeof files[key] === 'string' ? files[key] : files[key][project] || files[key].default;
        if (target) {
            let completeFrom = path.resolve(from, key);
            let completeTo = path.resolve(to, target);
            if (fs.existsSync(completeFrom)) {
                backup(completeTo);
                mkdir(completeTo);
                if (isFile(completeTo)) {
                    shell.mv('-n', completeFrom, completeTo);
                } else {
                    shell.mv('-n', path.join(completeFrom, '*'), completeTo);
                }
            }
        }
    });
};

const rm = (files) => {
    Object.keys(files).forEach(target => {
        const inProject = typeof files[target] === 'object' && Array.isArray(files[target]) && files[target].indexOf(project) >= 0;
        if (inProject && fs.existsSync(target)) {
            shell.echo('💠 Removing: ' + target);
            backup(target);
            shell.rm('-rf', target);
        }
    });
};

mkdir(backupDir);

module.exports = { execFileSync, echo, cd, copy, move, rm, mkdir, generate, writeFileSync };
