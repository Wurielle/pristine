const renderer = ({project}) => {
    return `
/* Add polyfills from the polyfills folder (order matters) */
import '@/polyfills/WeakMap';
import '@/polyfills/MutationObserver';
import '@/polyfills/ObjectFit';
import '@/polyfills/CustomProperties.min';

/* Add scrollbar-width variable for accurate calculations with calc */
document.documentElement.style.setProperty(
    '--scrollbar-width',
    window.innerWidth - document.documentElement.clientWidth + 'px',
);

/* Import Pristine Config (for HRM)  */
import '@config/pristine.config.js';

/** Unicons: https://iconscout.com/unicons */
import '@iconscout/unicons/css/line.css';

/* Auto Imports */
const srcContext = require.context(
    '@',
    true,
    /\.(runtime|asset|style)\.(.*?)$/,
);
srcContext.keys().forEach(srcContext);

${project === 'vue-cli-symfony-4' ? `
const templatesContext = require.context(
    '@root/templates',
    true,
    /\.(runtime|asset|style)\.(.*?)$/,
);
templatesContext.keys().forEach(templatesContext);
` : ''}

/* Import Styles */
import '@/styles/main.scss';
`;
}

module.exports = renderer;
