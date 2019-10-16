import uuid from 'uuid/v1';
/* uncomment if you're using twig files: https://github.com/twigjs/twig.js */
import Twig from 'twig';

Twig.extendFunction("uuid", () => {
    return uuid();
});

Twig.extendFunction("asset", (value: string) => {
    return value;
});

Twig.extendFunction("path", (value: string) => {
    return value;
});

Twig.extendFilter("trans", (value: string) => {
    return value;
});

//
// /* removes cached requests from include/embed/... */
Twig.cache(false);
//
// /* adds files to server */
const TwigFiles = require.context('@root/templates', true, /\.twig$/);
TwigFiles.keys().forEach(TwigFiles);
//
// /* enables HMR for root and nested twig files
//  * (file-loader doesn't detect changes for some reasons so we import them as raw strings) */
const TwigFilesRaw = require.context('@root/templates?raw', true, /\.twig$/);
TwigFilesRaw.keys().forEach(TwigFilesRaw);
//
// /* Twig configuration */
const renderTwig = (path: any, data = {}) => {
    return new Promise((resolve, reject) => {
        Twig.twig(({
            namespaces: {'AppTemplates': 'templates'},
            href: path,
            load: (template: any) => {
                resolve(template.render(data))
            },
        }) as any);
    });
};


export {renderTwig};
