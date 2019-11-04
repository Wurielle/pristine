const path = require('path');

const pristinePath = path.resolve(__dirname,'../../');
const cwd = process.cwd();
const cwdParsed = path.parse(cwd);

const getJSONSync = (path, defaultReturn = {}) => {
    const rawData = fs.readFileSync('student.json');
    return rawData ? JSON.parse(rawData) : defaultReturn;
};

module.exports = { pristinePath, cwd, cwdParsed, getJSONSync };
