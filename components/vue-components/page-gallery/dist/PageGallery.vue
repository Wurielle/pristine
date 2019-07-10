<style lang="scss" scoped>

    $bg-color: rgba(black, .5);

    .pr-gallery {

        &.pr-gallery--fullscreen {

            position: fixed;

            top: 0;

            left: 0;

            right: 0;

            bottom: 0;

            z-index: 99999;

            background-color: $bg-color;

        }

        .pr-gallery__main,

        .swiper-container {

            width: 100%;

            height: 100%;

        }

        .swiper-wrapper {

            /deep/ {

                .swiper-slide {

                    position: relative;

                    width: 100%!important;

                    height: 100%!important;

                }

            }

        }

    }

</style>



<template>

    <div class="pr-gallery" :class="{

        'pr-gallery--fullscreen': state.options.fullscreen,

    }">

        <div class="pr-gallery__main">

            <!--<Slider></Slider>-->

            <!--&lt;!&ndash; Slider main container &ndash;&gt;-->

            <!--<div :id="id" class="swiper-container">-->

                <!--<slot name="pr-gallery-top"></slot>-->

                <!--&lt;!&ndash; Additional required wrapper &ndash;&gt;-->

                <!--<div class="swiper-wrapper">-->

                    <!--&lt;!&ndash; Slides &ndash;&gt;-->

                    <!--<div class="swiper-slide" v-for="(page, index) in pages">-->

                        <!--<slot :name="`pr-gallery-page-${index}`"></slot>-->

                    <!--</div>-->

                <!--</div>-->



                <!--&lt;!&ndash; If we need navigation buttons &ndash;&gt;-->

                <!--<slot name="pr-gallery-left">-->

                    <!--<div class="swiper-button-prev"></div>-->

                <!--</slot>-->

                <!--<slot name="pr-gallery-right">-->

                    <!--<div class="swiper-button-next"></div>-->

                <!--</slot>-->



                <!--&lt;!&ndash; If we need pagination &ndash;&gt;-->

                <!--<slot name="pr-gallery-bottom">-->

                    <!--<div class="swiper-pagination"></div>-->

                <!--</slot>-->

            <!--</div>-->

        </div>

    </div>

</template>



<script lang="ts">

    interface Options {

        fullscreen?: boolean;

    }

    const defaultOptions: Options = {

        fullscreen: false

    };

    const defaultSwiperOptions: any = {

        // Optional parameters

        direction: 'horizontal',

        loop: true,

        // If we need pagination

        pagination: {

            el: '.swiper-pagination',

        },



        // Navigation arrows

        navigation: {

            nextEl: '.swiper-button-next',

            prevEl: '.swiper-button-prev',

        },



        // And if we need scrollbar

        scrollbar: {

            el: '.swiper-scrollbar',

        },

    };

    import {

        Vue,

        Component,

        Watch,

        Prop

    } from "vue-property-decorator";

    import Swiper from 'swiper';

    import Slider from './swiper.vue';

    const uuid = require('uuid/v1');

    @Component({

        components: {

            Slider

        }

    })

    export default class PageGallery extends Vue {

        swiper: any;

        state: any = {

            options: {}

        };

        @Prop({default: 0}) pages: number;

        @Prop({default: 0}) index: number;

        @Prop({default: defaultOptions}) options: Options;

        @Prop({default: () => defaultSwiperOptions}) swiperOptions: any;

        id: any = uuid();



        created() {



        }



        mounted() {

            console.log(this);

            // this.state.options = {...defaultOptions, ...this.options};

            // const swiperOptions = {...defaultSwiperOptions, ...this.swiperOptions, initialSlide: this.index};

            // this.$nextTick(() => {

            //     this.swiper = new Swiper(`#${this.id}`, swiperOptions);

            //     window.dispatchEvent(new Event("resize"));

            // });

            // this.bindListeners();

        }



        goToPrevious() {

            // this.swiper.slidePrev();

        }



        goToNext() {

            // this.swiper.slideNext();

        }



        bindListeners() {

            this.$on('previous', this.goToPrevious);

            this.$on('next', this.goToNext);

        }



        beforeDestroy() {



        }



        destroyed() {



        }

    }

</script>



<style lang="scss">



</style>