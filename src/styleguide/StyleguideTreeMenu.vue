<style lang="scss" scoped>
</style>

<template>
    <ul>
        <li v-if="level === 0" >
            <a href="#" @click.prevent="$emit('input', null)" :class="{'styleguide-link--active': value === null}"><span>All</span></a>
        </li>
        <li v-for="link in nodes">
            <a :href="`#`" @click.prevent="$emit('input', link.id)" :class="{'styleguide-link--active': getSelected(link.id)}"><span>{{link.name}}</span></a>
            <StyleguideTreeMenu :key="link.name" :level="link.level + 1" v-if="link.children.length > 0" :nodes="getLinks(link.level + 1, link.id)" :sections="sections" @input="$emit('input', $event)" :value="value"></StyleguideTreeMenu>
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
        @Prop({required: true}) public level: any;
        @Prop() public value: any;

        public getLinks(level: number = 0, parentID: number){
            return _.filter(this.sections, (section: any) => {
                if(typeof parentID) {
                    return section.level === level && section.parent === parentID;
                }
                return section.level === level;
            });
        };
        getSelected(id: any) {
            let selected = _.find(this.sections, (section: any) => section.id === this.value);
            if (this.value !== null) {
                return this.value === id || _.includes(selected.parents, id);
            }
            return false;
        }
    }
</script>

<style lang="scss">

</style>