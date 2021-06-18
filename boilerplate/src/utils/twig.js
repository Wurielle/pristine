// @ts-ignore
import pristine from '@root/pristine.config';
// @ts-ignore
import Twig from 'twig';

/* Removes cached requests from include/embed/... */
Twig.cache(false);

/* Adds functions to twig template */
Object.keys(pristine.twig.functions)
    .forEach((name: string) => {
        Twig.extendFunction(name, pristine.twig.functions[name]);
    })

/* Adds files to server */
const TwigFiles = pristine.twig.context.default;
TwigFiles.keys().forEach(TwigFiles);

/* Enables HMR for root and nested twig files
 * (file-loader doesn't detect changes for some reasons so we import them as raw strings)
 * */
const TwigFilesRaw = pristine.twig.context.raw;
TwigFilesRaw.keys().forEach(TwigFilesRaw);

/* Twig configuration */
export const renderTwig = (path: any, data = {}) => {
    return new Promise((resolve, reject) => {
        Twig.twig(({
            namespaces: pristine.twig.namespaces,
            href: path,
            load: (template: any) => {
                resolve(template.render(data))
            },
        }) as any);
    });
};

export const TwigComponentMixin = {
    data() {
        return {
            html: '',
        }
    },
    template: '<div v-html="html"></div>',
};

export const TwigComponent = (twigPath: any, params: any = {}) => ({
    mixins: [TwigComponentMixin],
    async mounted() {
        if (twigPath) {
            this.html = await renderTwig(twigPath, this.$data);
        }
    },
    ...params,
});

export default {renderTwig, TwigComponent, TwigComponentMixin};
