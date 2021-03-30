const pristineConfig = require('./pristine.config');
const enablePurge = process.env.NODE_ENV !== 'development';

const tailwindConfig = {
    prefix: '',
    separator: ':',
    important: false,
    purge: {
        enabled: enablePurge,
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
    variants: {
        extend: {},
    },
    corePlugins: {},
    plugins: [],
};

module.exports = tailwindConfig;
