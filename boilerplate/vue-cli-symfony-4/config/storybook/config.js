/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from '@storybook/vue';
import centered from '@storybook/addon-centered/vue';
addDecorator(centered);

const req = require.context('../../templates', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
