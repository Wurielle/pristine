const path = require('path');
const fs = require('fs');

const action = process.argv[2];
const project = process.argv[3];

if (!action) {
    throw new Error("No action specified.");
}

if (!project) {
    throw new Error("No project type specified.");
}

const cwd = process.cwd();
const pristinePath = path.resolve(cwd, '.pristine/temp/lib');
const cwdParsed = path.parse(cwd);

const getJSONSync = (path, defaultReturn = null) => {
    if (fs.existsSync(path)) {
        const rawData = fs.readFileSync(path);
        return rawData ? JSON.parse(rawData) : defaultReturn;
    }
    return defaultReturn;
};
const defaultPristineState = {
    checkpoints: [],
};
const pristineStatePath = path.join(cwd, '.pristine.json');

module.exports = { pristinePath, cwd, cwdParsed, defaultPristineState, pristineStatePath, action, project, getJSONSync };
