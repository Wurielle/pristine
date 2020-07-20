const renderer = ({project}) => {
    return `
module.exports = {
    stories: [
    ${ project === 'vue-cli-symfony-4' ? `
        '../../templates/**/*.stories.(js|jsx|ts|tsx|mdx)',
        '../../assets/app/**/*.stories.(js|jsx|ts|tsx|mdx)',
    ` : ''
    }
        '../../src/**/*.stories.(js|jsx|ts|tsx|mdx)',
    ],
        addons: [
        '@storybook/addon-actions',
        /* Uncomment if you have @storybook/addon-docs installed */
        // {
        //     name: '@storybook/addon-docs',
        //     options: {
        //         babelOptions: {
        //             presets: [
        //                 [
        //                     '@vue/cli-plugin-babel/preset',
        //                     {
        //                         jsx: false
        //                     }
        //                 ]
        //             ]
        //         }
        //     }
        // },
        '@storybook/addon-knobs',
        '@storybook/addon-links',
        '@storybook/addon-notes',
        '@storybook/addon-viewport',
        '@storybook/addon-a11y',
        '@storybook/addon-storysource',
    ],
        webpack: async (config, { configType }) => {
        const storybookConfig = {...config};

        storybookConfig.module.rules = [
            ...storybookConfig.module.rules,
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    appendTsSuffixTo: ['\\.vue$']
                }
            },
            {
                test: /\.twig$/,
                oneOf: [
                    {
                        resourceQuery: /raw/,
                        loader: 'raw-loader',
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
        ];
        return storybookConfig;
    }
};
`;
}

module.exports = renderer;
