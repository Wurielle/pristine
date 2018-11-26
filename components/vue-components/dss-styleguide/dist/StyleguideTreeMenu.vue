<style lang="scss" scoped>

</style>



<template>

    <div class="styleguide:ul">

        <div class="styleguide:li" v-if="level === 0" >

            <div class="styleguide:a" href="#" @click.prevent="$emit('input', null)" :class="{'styleguide-link--active': value === null}"><div class="styleguide:span">All</div></div>

        </div>

        <div class="styleguide:li" v-for="link in nodes">

            <div class="styleguide:a" :href="`#`" @click.prevent="$emit('input', link.id)" :class="{'styleguide-link--active': getSelected(link.id)}"><div class="styleguide:span">{{link.name}}</div></div>

            <StyleguideTreeMenu :key="link.name" :level="link.level + 1" v-if="link.children.length > 0" :nodes="getLinks(link.level + 1, link.id)" :sections="sections" @input="$emit('input', $event)" :value="value"></StyleguideTreeMenu>

        </div>

    </div>

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

        @Prop({required: true}) nodes: any;

        @Prop({required: true}) sections: any;

        @Prop({required: true}) level: any;

        @Prop() value: any;



        getLinks(level: number = 0, parentID: number) {

            return _.filter(this.sections, (section: any) => {

                if(typeof parentID) {

                    return section.level === level && section.parent === parentID;

                }

                return section.level === level;

            });

        }



        getSelected(id: any) {

            const selected = _.find(this.sections, (section: any) => section.id === this.value);

            if (this.value !== null) {

                return this.value === id || _.includes(selected.parents, id);

            }

            return false;

        }

    }

</script>



<style lang="scss">



</style>