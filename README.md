# Pristine
## Dev Requirements
* [Node.js](https://nodejs.org/en/) (^8.0.0 or latest LTS)
   * If you already have Node.js installed, you can check your version using `node -v`
* NPM (Comes with Node.js)
* Windows Build Tools
    * Launch Windows PowerShell **AS ADMINISTRATOR**
    * Run `npm install --global --production windows-build-tools` in Windows PowerShell
        * **NOTE**: This will install Python [which might be required by some node modules](https://github.com/nodejs/node-gyp/issues/809#issuecomment-399698406) so it's always a good idea to have at least a version of `windows-build-tools`
   
## Global Dependencies
```bash
npm config set '@bit:registry' https://node.bitsrc.io
# or if you use yarn
# yarn config set "@bit:registry" "https://node.bitsrc.io/"
npm install -g @vue/cli
npm i -g bit-bin

```
## Project Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

## Create A New Project Based On Pristine (Requires Global Dependencies)
```bash 
vue create MyProject
cd MyProject

# Add watch mode to Vue-CLI
vue add vue-cli-plugin-build-watch // Adds watch mode to Vue-CLI

# Add Element UI (https://element.eleme.io/#/en-US)
vue add element

# Add Storybook Vue-CLI plugin (https://storybook.js.org/)
vue add storybook

# Add Workflow Dependencies
npm i minimist postcss-pxtorem -D

# Add Dev Dependencies
npm i tailwindcss lodash -D

# Add Bit Dependencies
npm i @bit/wurielle.pristine.webpack.dss-plugin -D
npm i @bit/wurielle.pristine.webpack.json-sass-plugin -D
npm i @bit/wurielle.pristine.vue-components.dss-styleguide -D
```

### Creating / Editing Files
#### Project
``vue.config.js``
```javascript
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');

module.exports = {
    baseUrl: '/',
    configureWebpack: {
        resolve: {
            alias: {
                '@config':  path.resolve(__dirname, 'config'),
            }
        },
        plugins:[
            new webpack.DefinePlugin({
                // 'API_AUTH_USERNAME': JSON.stringify(argv.apiAuthUsername.trim()),
                // 'API_AUTH_PASSWORD': JSON.stringify(argv.apiAuthPassword.trim()),
                // 'SERVICE_URL': JSON.stringify(argv.domain.trim())
            }),
            new JsonSassPlugin('./config/theme.js', './config/theme.scss'),
        ]
    }
};
```

Add ``src/styles`` files to your new project.

#### Styleguide
``config/storybook/webpack.config.js``
```javascript
const path = require("path");
const webpack = require('webpack');

const DSSPlugin = require('@bit/wurielle.pristine.webpack.dss-plugin');
const JsonSassPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');
module.exports = {
    resolve: {
        alias: {
            '@config':  path.resolve(__dirname, '../../config'),
            '@':  path.resolve(__dirname, '../../src'),
        }
    },
    plugins:[
        new DSSPlugin({
            filter: /\.s(c|a)ss/,
            output: './src/styleguide.json',
            watch: './src',
            detector: '_@'
        }),
        new JsonSassPlugin('./config/theme.js', './config/theme.scss'),
    ]
};
```

``src/stories/index.stories.js``
```javascript
/* eslint-disable import/no-extraneous-dependencies */
import {storiesOf} from '@storybook/vue';

const Styleguide = require('@bit/wurielle.pristine.vue-components.dss-styleguide').default;
const styleguideJSON = require('@/styleguide.json');
import '@/styles/main.scss';

storiesOf('DSS Styleguide', module)
    .add('Styleguide', () => ({
        components: {Styleguide},
        data() {
            return {
                options: styleguideJSON
            }
        },
        template: '<Styleguide :styleguide="options"/>',
    }));
```

#### CSS
``postcss.config.js``
```javascript
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
```

``config/theme.js``
```javascript
const defaultConfig = require('tailwindcss/defaultConfig')();

const pristine = {
    unit: {
        base: "40px"
    },
    spaceUnit: {
        base: "20px"
    }
};

const colors = {
    ...defaultConfig.colors,
    'base-text-color': '#22292f',
    'base-bg-color': '#f8fafc',
    'base-border-color': '#dae1e7',
    'danger': '#e3342f',
    'warning': '#f6993f',
    'success': '#38c172',
    'secondary': '#3490dc',
    'info': '#3490dc',
    'primary': '#9561e2',
};

module.exports = {
    // Spread Default Config
    ...defaultConfig,

    // Custom Objects
    pristine,

    colors: {
        ...colors
    },

    screens: {
        ...defaultConfig.screens,
    },

    fonts: {
        ...defaultConfig.fonts,
    },

    textSizes: {
        ...defaultConfig.textSizes,
        'xs': '10px',
        'sm': '12px',
        'md': '14px',
    },

    fontWeights: {
        ...defaultConfig.fontWeights,
    },

    leading: {
        ...defaultConfig.leading,
        'base': 1.5,
    },

    tracking: {
        ...defaultConfig.tracking,
        'base': '0.05em',
        'ultrawide': '0.2em',
    },

    textColors: {
        ...colors
    },

    backgroundColors: {
        ...colors
    },

    backgroundSize: {
        ...defaultConfig.backgroundSize,
    },

    borderWidths: {
        ...defaultConfig.borderWidths,
    },

    borderColors: global.Object.assign({default: colors['grey-light']}, colors),


    borderRadius: {
        ...defaultConfig.borderRadius,
        'base': '2px',
        'full': '9999px',
    },

    width: {
        ...defaultConfig.width,
    },

    height: {
        ...defaultConfig.height,
    },

    minWidth: {
        ...defaultConfig.minWidth,
        'screen': '100vw',
    },

    minHeight: {
        ...defaultConfig.minHeight,
        'screen': '100vh',
    },

    maxWidth: {
        ...defaultConfig.maxWidth,
    },

    maxHeight: {
        ...defaultConfig.maxHeight,
    },

    padding: {
        ...defaultConfig.padding,
        'base': pristine.spaceUnit.base,
    },

    margin: {
        ...defaultConfig.margin,
        'base': pristine.spaceUnit.base,
    },

    negativeMargin: {
        ...defaultConfig.negativeMargin,
        'base': "-" + pristine.spaceUnit.base,
    },

    shadows: {
        ...defaultConfig.shadows,
    },

    zIndex: {
        ...defaultConfig.zIndex,
    },

    opacity: {
        ...defaultConfig.opacity,
    },

    svgFill: {
        ...defaultConfig.svgFill,
    },

    svgStroke: {
        ...defaultConfig.svgStroke,
    },

    modules: {
        appearance: ['responsive'],
        backgroundAttachment: ['responsive'],
        backgroundColors: ['responsive', 'hover', 'focus'],
        backgroundPosition: ['responsive'],
        backgroundRepeat: ['responsive'],
        backgroundSize: ['responsive'],
        borderCollapse: [],
        borderColors: ['responsive', 'hover', 'focus'],
        borderRadius: ['responsive'],
        borderStyle: ['responsive'],
        borderWidths: ['responsive'],
        cursor: ['responsive'],
        display: ['responsive'],
        flexbox: ['responsive'],
        float: ['responsive'],
        fonts: ['responsive'],
        fontWeights: ['responsive', 'hover', 'focus'],
        height: ['responsive'],
        leading: ['responsive'],
        lists: ['responsive'],
        margin: ['responsive'],
        maxHeight: ['responsive'],
        maxWidth: ['responsive'],
        minHeight: ['responsive'],
        minWidth: ['responsive'],
        negativeMargin: ['responsive'],
        opacity: ['responsive'],
        outline: ['focus'],
        overflow: ['responsive'],
        padding: ['responsive'],
        pointerEvents: ['responsive'],
        position: ['responsive'],
        resize: ['responsive'],
        shadows: ['responsive', 'hover', 'focus'],
        svgFill: [],
        svgStroke: [],
        tableLayout: ['responsive'],
        textAlign: ['responsive'],
        textColors: ['responsive', 'hover', 'focus'],
        textSizes: ['responsive'],
        textStyle: ['responsive', 'hover', 'focus'],
        tracking: ['responsive'],
        userSelect: ['responsive'],
        verticalAlign: ['responsive'],
        visibility: ['responsive'],
        whitespace: ['responsive'],
        width: ['responsive'],
        zIndex: ['responsive'],
    },

    plugins: [
        require('tailwindcss/plugins/container')({
            center: true,
            padding: pristine.spaceUnit.base,
        }),
    ],

    options: {
        prefix: 'pr-',
        important: false,
        separator: ':',
    },

};
```
