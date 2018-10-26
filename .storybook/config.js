import { configure, addDecorator } from '@storybook/vue';
// import { withInfo } from '@storybook/addon-info';
// addDecorator(
//     // withInfo({
//     //     // header: false,
//     //     // inline: true,
//     //     // source: true,
//     //     // propTables: false
//     // })
// );

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
