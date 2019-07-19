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

/* uncomment if you're using twig files */
// import Twig from 'twig';
//
// Twig.cache(false);
// const TwigFiles = require.context('@root/templates/front', true, /\.twig$/);
// TwigFiles.keys().forEach(TwigFiles);
// const renderTwig = (path, data = {}) => {
//     return new Promise((resolve, reject) => {
//         Twig.twig({
//             namespaces: {'AppFront': 'templates/front'},
//             href: path,
//             load: (template) => {
//                 resolve(template.render(data))
//             },
//         });
//     });
// };
//
// storiesOf('Twig', module)
//     .add('button', () => ({
//         data() {
//             return {
//                 html: null,
//             }
//         },
//         async mounted() {
//             /* require enables HMR */
//             require('@root/templates/front/atoms/button.html.twig?raw').default;
//             this.html = await renderTwig(require('@root/templates/front/atoms/button.html.twig'), {
//                 button_content: 'button',
//             });
//         },
//         template: '<div v-html="html"></div>',
//     }));
