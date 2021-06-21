const renderer = ({project}) => {
    return `
import pristine from '@root/pristine.config';

const srcContext = pristine.context.src;
srcContext.keys().forEach(srcContext);

${project === 'vue-cli-symfony-4' ? `
const templatesContext = pristine.context.templates;
templatesContext.keys().forEach(templatesContext);
` : ''}
`;
}

module.exports = renderer;
