/* Add polyfills from the polyfills folder (order matters) */
import '@/polyfills/WeakMap';
import '@/polyfills/MutationObserver';

/* Import Pristine Config (for HRM)  */
import '@config/pristine.config.js';

/* Choose an icon library */

/** Ionicons: https://ionicons.com/ */
// import 'ionicons/dist/css/ionicons.min.css';

/** Fontisto: https://www.fontisto.com/icons */
// import 'fontisto';

/** Feather: https://feathericons.com/ */
// @ts-ignore
// import feather from 'feather-icons';
// import Ready from '@/utils/ready';
// (() => {
//     Ready.watch('[data-feather]', () => {
//         feather.replace();
//     });
// })();

/* Import Styles */
import '@/styles/main.scss';

/* Import Assets */
