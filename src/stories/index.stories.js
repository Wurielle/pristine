/* eslint-disable import/no-extraneous-dependencies */
import {storiesOf} from '@storybook/vue';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

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
