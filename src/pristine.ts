/* Add polyfills from the polyfills folder (order matters) */
import '@/polyfills/WeakMap';
import '@/polyfills/MutationObserver';

/* Import Pristine Config (for HRM)  */
import '@config/pristine.config.js';

/* Choose an icon library */

/** Ionicons */
// import 'ionicons/dist/css/ionicons.min.css';

/** Fontisto */
// import 'fontisto';

/** Feather */
// let feather: any;
// import 'feather-icons';
// import Ready from '@/utils/ready';
// (() => {
//     Ready.watch('[data-feather]', () => {
//         feather.replace();
//     });
// })();

/* Import Styles */
import '@/styles/main.scss';

/* Import Assets */
