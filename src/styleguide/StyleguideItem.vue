<style lang="scss" scoped>
    $spacing: 20px;
    $unit: 40px;
    $br: 3px;
    fieldset {
        padding: $spacing;
        padding-bottom: 0;
        border-radius: $br;
        border-style: solid;
        border-width: 1px;
        border-color: #dae1e7;
        margin-bottom: $spacing;
        max-width: 100%;
        legend {
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
    .styleguide-mr {
        margin-right: $spacing;
    }
    hr {
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
    <fieldset>
        <legend>{{block.name}}:</legend>
        <p class="styleguide__description" v-html="block.description"></p>
        <div class="styleguide__markup" v-html="block.markup.example"></div>
        <hr>
        <div class="styleguide__actions">
            <button class="styleguide-button styleguide-mr" @click="active = !active">Show Example</button>
            <button class="styleguide-button" @click="$emit('copy', block.markup.example)">Copy Markup</button>
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