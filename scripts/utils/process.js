const path = require('path');
const fs = require('fs');

const pristinePath = path.resolve(__dirname,'../../');
const cwd = process.cwd();
const cwdParsed = path.parse(cwd);

const getJSONSync = (path, defaultReturn = {}) => {
    const rawData = fs.readFileSync(path);
    return rawData ? JSON.parse(rawData) : defaultReturn;
};

module.exports = { pristinePath, cwd, cwdParsed, getJSONSync };
