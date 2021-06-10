const pristineConfig = require('./pristine.config');

const tailwindConfig = {
    mode: 'jit',
    purge: {
        content: [
            './templates/**/*.html.twig',
            './templates/**/*.stories.js',
            './src/**/*.vue',
            './src/**/*.stories.js',
        ],
    },
    theme: {
        extend: {
            ...pristineConfig
        },
    },
};

module.exports = tailwindConfig;
