<style lang="scss" scoped>
    $spacing: 20px;
    $unit: 40px;
    $br: 3px;
    $header-height: 16rem;
    $navigation-width: 280px;
    #styleguide {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding-bottom: 8rem;
        .styleguide__header {
            height: $header-height;
            position: relative;
            display: flex;
            justify-content: center;
            align-content: center;
            h1 {
                display: inline-flex;
                align-items: center;
                text-align: center;
                text-transform: uppercase;
                font-size: 16px;
                letter-spacing: .4rem;
            }
        }

        .styleguide__nav {
            padding-top: $header-height;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: $navigation-width;
            padding-left: 50px;
            ul {
                padding: 0;
                margin: 0;
            }
            & > ul {
                padding-top: 8px;
            }
            /deep/ {
                ul {
                    width: 100%;
                }
                a {
                    &:before {
                        content: '';
                        z-index: -1;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 0%;
                        height: 100%;
                        background-color: #f5f5f5;
                        transition: all .5s cubic-bezier(.165, .84, .44, 1);
                    }
                }
                a,
                li {
                    position: relative;
                    min-height: 40px;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    align-items: start;
                    justify-content: center;
                    text-align: left;
                    margin-bottom: 0;
                    color: #22292f;
                    text-transform: uppercase;
                    font-size: 0.75rem;
                    letter-spacing: .2em;
                    text-decoration: none;
                    span {
                        margin: 0;
                        border-bottom: 2px dotted transparent;
                        transition: all .5s cubic-bezier(.165, .84, .44, 1);
                    }
                    &:hover {
                        color: #adadad;
                    }
                    &.styleguide-link--active {
                        color: #22292f;
                        &:before {
                            width: 100%;
                        }
                        span {
                            border-bottom: 2px dotted #22292f;
                        }
                    }
                }
                a {
                    padding-left: 40px;
                    margin-bottom: 2px;
                }
            }
        }

        .styleguide__content {
            padding-left: $navigation-width;
            .styleguide__content__container {
                max-width: 75rem;
                margin: auto;
                padding-left: $spacing;
                padding-right: $spacing;
            }
        }
    }
</style>

<template>
    <div id="styleguide">
        <header class="styleguide__header">
            <h1>PRISTINE</h1>
        </header>
        <nav class="styleguide__nav">
            <StyleguideTreeMenu :nodes="getLinks(0)" :level="0" :sections="sections" v-model="selected"></StyleguideTreeMenu>
        </nav>
        <div class="styleguide__content">
            <div class="styleguide__content__container">
                <StyleguideItem :block="block" v-for="(block, index) in selectedBlocks" @copy="copyToClipboard($event)"></StyleguideItem>
            </div>
        </div>
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
        private selected: any = null;
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

            // create parents relations
            this.sections.forEach((section: any) => {
                if(section.level > 0) {
                    section.parents = [];
                    let parent = _.find(this.sections, (findSection: any) => findSection.id == section.parent);
                    console.log("hey1");
                    while (parent.level > 0) {
                        section.parents.push(parent.id);
                        console.log("hey");
                        parent = _.find(this.sections, (findSection: any) => findSection.id == parent.parent);
                    }
                    if(parent.level === 0){
                        section.parents.push(parent.id);
                    }
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

        public get selectedBlocks() {
            if (this.selected !== null) {
                let selectedSection = _.find(this.sections, (findSection: any) => findSection.id === this.selected);
                return _.filter(this.styleguide.blocks, (block: any) => {
                    return block.section[selectedSection.level] === selectedSection.name;
                });
                // if(selectedSection.parents) {
                //     let selectedSectionParents = selectedSection.parents
                //         .map((parentID: any) => _.find(this.sections, (section: any) => section.id === parentID));
                //     return _.filter(this.styleguide.blocks, (block: any) => {
                //         return _.some(selectedSectionParents, (someSection) => {
                //             return someSection.name === block.section[someSection.level];
                //         });
                //     });
                // } else {
                //     return _.filter(this.styleguide.blocks, (block: any) => {
                //         return block.section[0] === selectedSection.name;
                //     });
                // }
            }
            return this.styleguide.blocks;
        }
    }
    Vue.component('Styleguide', Styleguide);
</script>

<style lang="scss">

</style>