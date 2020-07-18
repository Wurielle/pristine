module.exports = {
    stories: [
        '../../templates/**/*.stories.(js|jsx|ts|tsx|mdx)',
        '../../assets/app/**/*.stories.(js|jsx|ts|tsx|mdx)',
        '../../src/**/*.stories.(js|jsx|ts|tsx|mdx)',
    ],
        addons: [
        '@storybook/addon-actions',
        {
            name: '@storybook/addon-docs',
            options: {
                babelOptions: {
                    presets: [
                        [
                            '@vue/cli-plugin-babel/preset',
                            {
                                jsx: false
                            }
                        ]
                    ]
                }
            }
        },
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
