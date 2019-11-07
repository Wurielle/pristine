const path = require('path');
const fs = require('fs');

const cwd = process.cwd();
const pristinePath = path.resolve(cwd, '.pristine/temp/lib');
const cwdParsed = path.parse(cwd);

const getJSONSync = (path, defaultReturn = {}) => {
    const rawData = fs.readFileSync(path);
    return rawData ? JSON.parse(rawData) : defaultReturn;
};

module.exports = { pristinePath, cwd, cwdParsed, getJSONSync };
