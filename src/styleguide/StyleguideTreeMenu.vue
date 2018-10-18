<style lang="scss" scoped>
</style>

<template>
    <ul>
        <li v-for="link in nodes">
            <a :href="`#${link.id}`">{{link.name}}</a>
            <StyleguideTreeMenu v-if="link.children.length > 0" :nodes="getLinks(link.level + 1, link.id)" :sections="sections"></StyleguideTreeMenu>
        </li>
    </ul>
</template>

<script lang="ts">
    import {
        Vue,
        Component,
        Watch,
        Prop
    } from "vue-property-decorator";
    import * as _ from 'lodash';
    @Component({
        name: 'StyleguideTreeMenu',
        components: {
        },
    })
    export default class StyleguideTreeMenu extends Vue {
        @Prop({required: true}) public nodes: any;
        @Prop({required: true}) public sections: any;

        public getLinks(level: number = 0, parentID: number){
            return _.filter(this.sections, (section: any) => {
                if(typeof parentID) {
                    return section.level === level && section.parent === parentID;
                }
                return section.level === level;
            });
        };
    }
</script>

<style lang="scss">

</style>