<style lang="scss" scoped>
    $spacing: 20px;
    $unit: 40px;
    $br: 3px;
    #styleguide {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding-bottom: 8rem;
        padding-top: 8rem;
        padding-left: $spacing;
        padding-right: $spacing;
        max-width: 75rem;
        margin: auto;
        h1 {
            text-align: center;
            text-transform: uppercase;
            margin-bottom: 8rem;
            font-size: 16px;
            letter-spacing: .4rem;
        }
    }
</style>

<template>
    <div id="styleguide">
        <h1>PRISTINE</h1>
        <StyleguideTreeMenu :nodes="getLinks(0)" :sections="sections"></StyleguideTreeMenu>
        <StyleguideItem :block="block" v-for="(block, index) in styleguide.blocks" @copy="copyToClipboard($event)"></StyleguideItem>
        <notifications group="copypasta" position="top right"/>
    </div>
</template>

<script lang="ts">
    let styleguideData: any;
    try {
        styleguideData = require('./styleguide.json');
    } catch (e) {
        styleguideData = {};
    }
    import {
        Vue,
        Component,
        Watch,
        Prop
    } from "vue-property-decorator";
    import StyleguideItem from './StyleguideItem.vue';
    import StyleguideTreeMenu from './StyleguideTreeMenu.vue';
    import Notifications from 'vue-notification';
    import * as _ from 'lodash';
    Vue.use(Notifications);
    @Component({
        components: {
            StyleguideItem,
            StyleguideTreeMenu,
        },
    })
    export default class Styleguide extends Vue {
        private styleguide: any = styleguideData;
        private sections: any[] = [];
        private cmOptions: any = {
            tabSize: 4,
            styleActiveLine: true,
            mode: 'htmlmixed',
            theme: 'monokai',
            lineNumbers: true,
            line: true,
            readOnly: true,
            lineWrapping: true,
        };
        public mounted() {
            this.createRelationTree();
        }

        public createRelationTree() {
            let id = 0;
            // create sections
            _.each(this.styleguide.blocks, (block: any) => {
                _.each(block.section, (section: string) => {
                    let newSection = { id: 0, name: section, level: _.indexOf(block.section, section) };
                    if (
                        !_.some(this.sections, (arraySection: any) =>
                        arraySection.name === newSection.name && arraySection.level === newSection.level)
                    ){
                        newSection.id = id;
                        this.sections.push(newSection);
                        id++;
                    }
                });
            });

            // create children relations
            this.sections.forEach((section: any) => {
                let children = _.filter(this.styleguide.blocks, (block: any) => block.section[section.level] === section.name);
                children = children.map((child: any) => _.find(this.sections, (findSection: any) => findSection.name === child.name).id);
                if(_.includes(children, section.id)) {
                    _.remove(children, (child: any) => child === section.id);
                }
                section.children = children;
            });

            // create parent relations
            this.sections.forEach((section: any) => {
                if(section.level > 0) {
                    let parentLevelSections = _.filter(
                        this.sections, (filterSection: any) => filterSection.level === section.level - 1
                    );
                    _.each(parentLevelSections, (parentLevelSection) => {
                       if (_.includes(parentLevelSection.children, section.id)) {
                           section.parent = parentLevelSection.id;
                       }
                    });
                }
            });

        }

        public toggleExample(block: any) {
            console.log(block.StyleguideCollapsedMarkup);
            block.StyleguideCollapsedMarkup = block.StyleguideCollapsedMarkup ? false : true;
            block.StyleguideCollapsedMarkup = !block.StyleguideCollapsedMarkup;
            console.log(!block.StyleguideCollapsedMarkup);
        }

        public copyToClipboard(text: any) {
            if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                var textarea = document.createElement("textarea");
                textarea.textContent = text;
                textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                } catch (ex) {
                    console.warn("Copy to clipboard failed.", ex);
                    return false;
                } finally {
                    document.body.removeChild(textarea);
                }
            }
            (this as any).$notify({
                group: 'copypasta',
                text: 'Copied to clipboard!'
            });
        }

        public getLinks(level: number = 0){
            return _.filter(this.sections, (section: any) => {
                return section.level === level;
            });
        };
    }
    Vue.component('Styleguide', Styleguide);
</script>

<style lang="scss">

</style>