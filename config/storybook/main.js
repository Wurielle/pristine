const baseConfig = require('./base.config');

module.exports = {
    ...baseConfig,
    stories: [
        '../../src/**/*.stories.(js|jsx|ts|tsx|mdx)',
    ],
};
