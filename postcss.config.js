module.exports = {
    plugins: [
        require('tailwindcss')('./config/theme.js'),
        require('autoprefixer'),
        require('postcss-pxtorem')({
            replace: true,
            propList: ['*'],
        }),
    ]
};