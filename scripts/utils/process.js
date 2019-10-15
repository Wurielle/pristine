const path = require('path');

const pristinePath = path.resolve(__dirname,'../../');
const dependencies = require('../dependencies.json');
const actions = require('../actions.json');
const cwd = process.cwd();
const cwdParsed = path.parse(cwd);

module.exports = { pristinePath, dependencies, actions, cwd, cwdParsed };
