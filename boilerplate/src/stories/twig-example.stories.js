// /* This is an example on how to use twig within storybook */
// import '@/pristine';
// import {TwigComponent, renderTwig} from '@/utils/twig';
//
// const twigPath = require('./button.html.twig');
//
// export default {
//     title: 'Atoms/Button',
//     component: TwigComponent(twigPath),
//     excludeStories: /.*(Data|Path)$/
// }
//
// export const Default = () => TwigComponent(twigPath, {
//     data() {
//         return {
//             button_content: 'Hello World',
//             button_icon: 'view',
//             button_modifiers: [],
//         }
//     },
// });
//
// export const WithRenderTwig = () => ({
//     data() {
//         return {
//             html: null,
//         }
//     },
//     async mounted() {
//         this.html = `
//             <div>
//                 <!-- Render as many components as you want instead of just one with renderTwig-->
//                 ${await renderTwig(twigPath, {
//                     button_content: 'Hello World',
//                     button_icon: 'view',
//                     button_modifiers: [],
//                 })}
//             </div>
//         `;
//     },
//     template: '<div v-html="html"></div>'
// });
