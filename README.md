# pristine
## Project init
In any CLI:
```
npm install -g @vue/cli
vue create MyProject
cd MyProject
vue add vue-cli-plugin-build-watch
vue add element
npm i tailwindcss lodash json-sass@1.2.1 node-watch minimist postcss-pxtorem -D
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
