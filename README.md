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
