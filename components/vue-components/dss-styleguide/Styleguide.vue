/**
* @render vue
* @name vue-components/dss-styleguide
* @description A Vue component to render CSS styleguides under the [DSS (Document Style Sheet)]{@link https://github.com/DSSWG/DSS} format.
* @example
* <Styleguide :styleguide="DSSOutputObject"></Styleguide>
*/
<style lang="scss" scoped>
    $spacing: 20px;
    $unit: 40px;
    $br: 3px;
    $header-height: 60px;
    $navigation-width: 280px;
    $transition: all .2s cubic-bezier(.175,.885,.32,1.275);
    $transition2: all .4s cubic-bezier(.165, .84, .44, 1);
    #styleguide {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding-bottom: 8rem;
        padding-top: $header-height + $unit;
        background-color: #FEFEFE;
        .styleguide__header {
            height: $header-height;
            display: flex;
            align-content: center;
            /*box-shadow: 0px 2px 6px rgba(0,0,0,0.1);*/
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #fafafa;
            padding-left: $unit;
            padding-right: $unit;
            z-index: 999999999999999999999999999999999999999999;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            .styleguide__header__actions {
                .styleguide-button {
                    margin-bottom: 0;
                }
            }
            .styleguide__header__nav-handle {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 99999;
                width: $spacing;
                height: 100vh;
            }
        }

        .styleguide__nav {
            padding-top: $header-height;
            flex-direction: column;
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            height: 100vh;
            width: $navigation-width;
            transition: $transition;
            background-color: white;
            z-index: 1000;
            &.styleguide__nav--visible {
                opacity: 1!important;
                transform: translateX(0)!important;
                pointer-events: auto!important;
            }
            .styleguide\:ul {
                padding: 0;
                margin: 0;
            }
            & > .styleguide\:ul {
                /*padding-top: 8px;*/
                flex: 1;
                overflow-y: auto;
            }
            /deep/ {

                .styleguide\:p {
                    margin-bottom: $spacing;
                }

                .styleguide\:ul {
                    width: 100%;
                }
                .styleguide\:a {
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
                .styleguide\:a,
                .styleguide\:li {
                    position: relative;
                    min-height: $unit;
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
                    .styleguide\:span {
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
                        .styleguide\:span {
                            border-bottom: 2px dotted #22292f;
                        }
                    }
                }
                .styleguide\:a {
                    padding-left: $unit;
                    margin-bottom: 2px;
                }
            }
        }

        .styleguide__content {
            padding-left: $navigation-width;
            transition: $transition2;
            .styleguide__content__container {
                max-width: 75rem;
                margin: auto;
                padding-left: $spacing;
                padding-right: $spacing;
                transition: $transition2;
            }
        }
        /deep/ {

            .styleguide\:h1 {
                display: inline-flex;
                align-items: center;
                text-align: center;
                text-transform: uppercase;
                font-size: 16px;
                letter-spacing: .4rem;
            }

            .styleguide\:p {
                margin-bottom: $spacing;
            }

            .styleguide\:a {
                cursor: pointer;
            }

            .styleguide\:ul {
                padding-left: $unit;
            }

            .styleguide-button {
                margin-bottom: $spacing;
                text-align: center;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                display: -webkit-inline-box;
                display: -ms-inline-flexbox;
                display: inline-flex;
                text-decoration: none;
                text-transform: uppercase;
                height: $unit;
                padding-left: $spacing;
                padding-right: $spacing;
                color: #22292f;
                background-color: #fff;
                border-radius: $br;
                border-style: solid;
                border-width: 1px;
                border-color: #dae1e7;
                background-color: #fff;
                cursor: pointer;
                font-size: 0.625rem;
                font-weight: 600;
                letter-spacing: .2em;
                &:hover {
                    border-color: #bbc8d3;
                }
                &:active {
                    border-color: #bbc8d3;
                    background-color: #e6edf4;
                }
            }
        }

        &.styleguide--full-width {
            .styleguide__content {
                padding-left: 0;
                .styleguide__content__container {
                    padding-left: 0;
                    padding-right: 0;
                    max-width: 100%;
                    .styleguide\:fieldset {
                        border-radius: 0;
                        border-left: 0;
                        border-right: 0;
                        margin-bottom: 100px;
                    }
                }
            }
            .styleguide__nav {
                opacity: 0;
                pointer-events: none;
                transform: translateX(-$unit + 4px);
            }
        }
    }
</style>

<template>
    <div id="styleguide" :class="{ 'styleguide--full-width': state.fullWidth }">
        <div class="styleguide__header" @mouseenter="state.menuVisible = true" @mouseleave="state.menuVisible = false">
            <div class="styleguide__header__brand">
                <div class="styleguide:h1">PRISTINE</div>
            </div>
            <div class="styleguide__header__actions">
                <div @click="state.fullWidth = !state.fullWidth" class="styleguide-button">Toggle Full Width</div>
            </div>
            <div class="styleguide__header__nav-handle"></div>
        </div>
        <div class="styleguide__nav" :class="{'styleguide__nav--visible': state.menuVisible }" @mouseenter="state.menuVisible = true" @mouseleave="state.menuVisible = false">
            <StyleguideTreeMenu :nodes="getLinks(0)" :level="0" :sections="sections" v-model="selected"></StyleguideTreeMenu>
        </div>
        <div class="styleguide__content">
            <div class="styleguide__content__container">
                <StyleguideItem :key="block.name" :block="block" v-for="(block, index) in selectedBlocks" @copy="copyToClipboard($event)"></StyleguideItem>
            </div>
        </div>
        <notifications group="copypasta" position="top right"/>
    </div>
</template>

<script lang="ts">
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
        /**
         * @property {object} styleguide - [DSS Output Object]{@link https://github.com/DSSWG/DSS#example-output}
         */
        @Prop({required: true}) styleguide: any;
        sections: any[] = [];
        selected: any = null;
        cmOptions: any = {
            tabSize: 4,
            styleActiveLine: true,
            mode: 'htmlmixed',
            theme: 'monokai',
            lineNumbers: true,
            line: true,
            readOnly: true,
            lineWrapping: true,
        };
        state: any = {
            fullWidth: true,
            menuVisible: false
        };

        @Watch('state', { deep: true })
        onStateChange() {
            localStorage.setItem('styleguideStates', JSON.stringify(this.state));
        }

        @Watch('selected')
        onSelectedChange() {
            let path = null;
            if(this.selected) {
                path = _.find(this.sections, (section: any) => section.id === this.selected).path;
            }
            localStorage.setItem('styleguidePath', JSON.stringify(path));
        }

        mounted() {
            this.handleStates();
            this.createRelationTree();
            this.navigateTo();
        }

        navigateTo() {
            if(localStorage.getItem('styleguidePath') && JSON.parse(localStorage.getItem('styleguidePath'))) {
                const section = _.find(this.sections, (section: any) => section.path === JSON.parse(localStorage.getItem('styleguidePath')));
                this.selected = section.id;
            }
        }

        handleStates() {
            const w = window;
            const d = document;
            const e = d.documentElement;
            const g = d.getElementsByTagName('body')[0];
            const width = w.innerWidth||e.clientWidth||g.clientWidth;
            if(width <= 768) {
                this.state.fullWidth = true
            }
            if (localStorage.getItem('styleguideStates')) {
                this.state = {
                    ...this.state,
                    ...JSON.parse(localStorage.getItem('styleguideStates'))
                }
            }
        }
        createRelationTree() {
            let id = 0;
            // create sections
            _.each(this.styleguide.blocks, (block: any) => {
                _.each(block.section, (section: string) => {
                    const newSection = { id: 0, name: section, level: _.indexOf(block.section, section) };
                    if (
                        !_.some(this.sections, (arraySection: any) =>
                        arraySection.name === newSection.name && arraySection.level === newSection.level)
                    ) {
                        newSection.id = id;
                        this.sections.push(newSection);
                        id++;
                    }
                });
            });

            // create children relations
            this.sections.forEach((section: any) => {
                let children = _.filter(
                    this.styleguide.blocks,
                    (block: any) => block.section[section.level] === section.name
                );
                children = children.map(
                    (child: any) => _.find(this.sections, (findSection: any) => findSection.name === child.name).id
                );
                if(_.includes(children, section.id)) {
                    _.remove(children, (child: any) => child === section.id);
                }
                section.children = children;
            });

            // create parent relations
            this.sections.forEach((section: any) => {
                if(section.level > 0) {
                    const parentLevelSections = _.filter(
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
                    let parent = _.find(this.sections, (findSection: any) => findSection.id === section.parent);
                    while (parent.level > 0) {
                        section.parents.push(parent.id);
                        parent = _.find(this.sections, (findSection: any) => findSection.id === parent.parent);
                    }
                    if(parent.level === 0) {
                        section.parents.push(parent.id);
                    }
                }
            });

            // recreate path
            this.sections.forEach((section: any) => {
                if(section.parents && section.parents.length > 0) {
                    section.parents.forEach((parentID: any) => {
                       const parent = _.find(this.sections, (findSection: any) => findSection.id === parentID);
                       section.path = encodeURI(parent.name.toLowerCase()) + '/' + encodeURI(section.name.toLowerCase());
                    });
                } else {
                    section.path = null;
                }
            });

        }

        copyToClipboard(text: any) {
            if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                const textarea = document.createElement("textarea");
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
            // (this as any).$notify({
            //     group: 'copypasta',
            //     text: 'Copied to clipboard!'
            // });
        }

        getLinks(level: number = 0) {
            return _.filter(this.sections, (section: any) => {
                return section.level === level;
            });
        }

        get selectedBlocks() {
            if (this.selected !== null) {
                const selectedSection = _.find(this.sections, (findSection: any) => findSection.id === this.selected);
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