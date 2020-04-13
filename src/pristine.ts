/* Auto Imports */
[
    '@',
    '@root/templates',

].forEach((path) => {
    const src = require.context(path, true, /\.(runtime|asset)\.(.*?)$/);
    src.keys().forEach(src);
});

/* Add polyfills from the polyfills folder (order matters) */
import '@/polyfills/WeakMap';
import '@/polyfills/MutationObserver';
import '@/polyfills/ObjectFit';

/* Import Pristine Config (for HRM)  */
import '@config/pristine.config.js';

/** Unicons: https://iconscout.com/unicons */
import '@iconscout/unicons/css/unicons.css';

/* Import Styles */
import '@/styles/main.scss';
