/* eslint-disable import/no-extraneous-dependencies */
import '@/pristine.ts';
import { storiesOf } from "@storybook/vue";

storiesOf("Storybook", module)
    .add("Hello World", () => ({
        components: { },
        template: '<div>Hello World</div>'
    }))
;

/* uncomment if you're using twig files: https://github.com/twigjs/twig.js */
// import Twig from 'twig';
//
// /* removes cached requests from include/embed/... */
// Twig.cache(false);
//
// /* adds files to server */
// const TwigFiles = require.context('@root/templates/front', true, /\.twig$/);
// TwigFiles.keys().forEach(TwigFiles);
//
// /* enables HMR for root and nested twig files
//  * (file-loader doesn't detect changes for some reasons so we import them as raw strings) */
// const TwigFilesRaw = require.context('@root/templates/front?raw', true, /\.twig$/);
// TwigFilesRaw.keys().forEach(TwigFilesRaw);
//
// /* Twig configuration */
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
// storiesOf('Atoms|Headings', module)
//     .add('heading', () => ({
//         data() {
//             return {
//                 html: null,
//             }
//         },
//         async mounted() {
//             this.html = await renderTwig(require('@root/templates/front/atoms/heading.html.twig'), {
//                 heading_content: 'Hello World',
//             });
//         },
//         template: '<div v-html="html"></div>',
//     }));
