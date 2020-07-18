// @ts-ignore
import uuid from 'uuid/v1';
/* uncomment if you're using twig files: https://github.com/twigjs/twig.js */
// @ts-ignore
import Twig from 'twig';

Twig.extendFunction("uuid", () => {
    return uuid();
});

Twig.extendFunction('asset', (value: any) => {
    const imgName = value.split('/')[value.split('/').length - 1];
    return require(`@/assets/${imgName}`);
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
            namespaces: {'AppFront': 'templates/frontend'},
            href: path,
            load: (template: any) => {
                resolve(template.render(data))
            },
        }) as any);
    });
};

const TwigComponentMixin = {
    data() {
        return {
            html: '',
        }
    },
    template: '<div v-html="html"></div>',
};

const TwigComponent = (twigPath: any, params: any = {}) => ({
    mixins: [TwigComponentMixin],
    async mounted() {
        if (twigPath) {
            this.html = await renderTwig(twigPath, this.$data);
        }
    },
    ...params,
});

export {renderTwig, TwigComponent, TwigComponentMixin};
