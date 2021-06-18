import {v4 as uuid} from 'uuid';

const screens = {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xl2: '1400px',
};

const pristine = {
    /* Tailwind configuration */
    tailwind: {
        screens,
        bootstrapBreakpoints: {
            min: 0,
            ...screens,
        },
        bootstrapMaxWidths: screens,
        gutters: {
            base: '15px',
        },
    },

    /* Twig configuration for Storybook */
    twig: {
        functions: {
            'uuid': () => uuid(),
            'path': (value) => value,
            'trans': (value) => value,
            'asset': (value) => {
                const imgName = value.split('/')[value.split('/').length - 1];
                return require(`@/assets/${imgName}`);
            },
        },
        namespaces: {
            /* NOTE: Don't forget to register namespaces in your Twig config
            * https://symfony.com/doc/2.8/templating/namespaced_paths.html
            **/
            'AppFront': 'templates/frontend'
        },
        context: {
            default: require.context('@root/templates', true, /\.twig$/),
            raw: require.context('@root/templates?raw', true, /\.twig$/),
        }
    },
    context: {
        src: require.context('@', true, /.(runtime|asset|style).(.*?)$/),
        templates: require.context('@root/templates', true, /.(runtime|asset|style).(.*?)$/),
    }
};

module.exports = pristine;
