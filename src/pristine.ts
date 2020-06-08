/* Import Pristine Config (for HRM)  */
import '@config/pristine.config.js';

/* Add polyfills from the polyfills folder (order matters) */
import '@/polyfills/WeakMap';
import '@/polyfills/MutationObserver';
import '@/polyfills/ObjectFit';

/** Unicons: https://iconscout.com/unicons */
import '@iconscout/unicons/css/unicons.css';

/* Import Styles */
import '@/styles/main.scss';

/* Auto Imports */
const srcContext = require.context('@', true, /\.(runtime|asset)\.(.*?)$/);
srcContext.keys().forEach(srcContext);

const templatesContext = require.context('@root/templates', true, /\.(runtime|asset)\.(.*?)$/);
templatesContext.keys().forEach(templatesContext);
