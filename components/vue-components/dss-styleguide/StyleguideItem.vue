<style lang="scss" scoped>
    $spacing: 20px;
    $unit: 41px;
    $br: 3px;
    .styleguide\:fieldset {
        padding: $spacing;
        padding-bottom: 0;
        border-radius: $br;
        border-style: solid;
        border-width: 1px;
        border-color: #dae1e7;
        margin-bottom: $spacing;
        max-width: 100%;
        .styleguide\:legend {
            padding-left: $spacing;
            padding-right: $spacing;
            display: block;
            margin-bottom: 0.41667rem;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 0.75rem;
            letter-spacing: .2em;
        }
    }
    .styleguide__code {
        font-family: monospace, sans-serif;
        margin-bottom: $spacing;
        border-radius: $br;
        overflow: hidden;
    }
    .styleguide__markup {
        margin-bottom: $spacing;
        width: 100%;
    }
    .styleguide__code {
        max-width: 100%;
        transition: max-height .2s cubic-bezier(.165, .84, .44, 1);
        max-height: 300px;
        &.styleguide__code--collapsed {
            margin-bottom: 0;
            max-height: 0;
        }
    }
    .styleguide__actions {
        text-align: right;
    }
    .styleguide-mr {
        margin-right: $spacing;
    }
    .styleguide\:hr {
        margin: 0;
        border-width: 0;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
        border-radius: 0.125rem;
        border-style: solid;
        border-top-width: 0.0625rem;
        border-color: #dae1e7;
    }
</style>

<template>
    <fieldset class="styleguide:fieldset">
        <legend class="styleguide:legend">{{block.name}}:</legend>
        <div class="styleguide:p styleguide__description" v-html="block.description"></div>
        <div class="styleguide__markup" v-html="block.markup.example"></div>
        <div class="styleguide:hr"></div>
        <div class="styleguide__actions">
            <div class="styleguide-button styleguide-mr" @click="active = !active">Show Example</div>
            <div class="styleguide-button" @click="$emit('copy', block.markup.example)">Copy Markup</div>
        </div>
        <div class="styleguide__code" :class="{'styleguide__code--collapsed': !active }">
            <codemirror :value="block.markup.example" :options="cmOptions"></codemirror>
        </div>
    </fieldset>
</template>

<script lang="ts">
    /// <reference path="styleguide.d.ts"/>
    import {
        Vue,
        Component,
        Watch,
        Prop
    } from "vue-property-decorator";

    import { codemirror } from 'vue-codemirror';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/monokai.css';
    import 'codemirror/mode/htmlmixed/htmlmixed.js';
    @Component({
        components: {
            codemirror,
        },
    })
    export default class StyleguideItem extends Vue {
        @Prop({required: true}) block: any;
        active: any = false;
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
    }
</script>

<style lang="scss">

</style>