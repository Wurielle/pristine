# pristine
## Global Dependencies
```bash
npm config set '@bit:registry' https://node.bitsrc.io
npm install -g @vue/cli
npm i -g @storybook/cli
npm i -g bit-bin
```

## Create a project (requires Global Dependencies)
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
npm i tailwindcss lodash

# Add Bit Dependencies
npm i @bit/wurielle.pristine.webpack.dss-plugin
npm i @bit/wurielle.pristine.webpack.json-sass-plugin

# Init TailwindCSS (https://tailwindcss.com/)
./node_modules/.bin/tailwind init config/theme.js 
```

Edit postcss.config.js with the following lines:
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
}
```

Create a vue.config.js file containing
```javascript
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));

const DSSWebpackPlugin = require('@bit/wurielle.pristine.webpack.dss-plugin');
const JsonSassWebpackPlugin = require('@bit/wurielle.pristine.webpack.json-sass-plugin');

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
            new DSSWebpackPlugin({
                filter: /\.s(c|a)ss/,
                output: './src/styleguide.json',
                watch: './src',
                detector: '_@'
            }),
            new JsonSassWebpackPlugin('./config/theme.js', './config/theme.scss')
        ]
    }
};
```
## Project setup
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
