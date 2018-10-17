<style lang="scss" scoped>
    $spacing: 20px;
    $br: 3px;
    h1 {
        text-align: center;
        text-transform: uppercase;
        margin-bottom: 8rem;
        font-size: 16px;
        letter-spacing: .2rem;
    }
    .styleguide {
        padding-bottom: 8rem;
        padding-top: 8rem;
        padding-left: $spacing;
        padding-right: $spacing;
        max-width: 75rem;
        margin: auto;
        .styleguide__code {
            font-family: monospace, sans-serif;
            margin-bottom: $spacing;
            border-radius: $br;
            overflow: hidden;
        }
    }
    fieldset {
        padding: $spacing;
        padding-bottom: 0;
        border-radius: $br;
        border-style: solid;
        border-width: 1px;
        border-color: #dae1e7;
        margin-bottom: $spacing;
    }
</style>

<template>
    <div class="styleguide">
        <h1>PRISTINE</h1>
        <fieldset v-for="block in styleguide.blocks">
            <legend>{{block.name}}:</legend>
            <p class="styleguide__description" v-html="block.description"></p>
            <div class="styleguide__markup" v-html="block.markup.example"></div>
            <div class="styleguide__code">
                <!--<pre><code v-html="block.markup.escaped"></code></pre>-->
                <codemirror :value="block.markup.example" :options="cmOptions"></codemirror>
            </div>
        </fieldset>
        <!--<fieldset>-->
            <!--<legend>tables:</legend>-->
            <!--<div class="pr-mb-base">-->
                <!--<div class="table">-->
                    <!--<table>-->
                        <!--<thead>-->
                        <!--<tr>-->
                            <!--<th>-->
                            <!--</th>-->
                            <!--<th>-->
                                <!--name-->
                            <!--</th>-->
                            <!--<th>-->
                                <!--age-->
                            <!--</th>-->
                            <!--<th>-->
                                <!--location-->
                            <!--</th>-->
                            <!--<th>-->

                            <!--</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr>-->
                            <!--<td>-->
                                <!--<img src="https://images.unsplash.com/photo-1539384894456-f4b7ceb0e407?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3849b2c9613fa713a1115faf7105588a&auto=format&fit=crop&w=800&q=80"-->
                                     <!--alt="">-->
                            <!--</td>-->
                            <!--<td>-->
                                <!--name-->
                            <!--</td>-->
                            <!--<td>-->
                                <!--age-->
                            <!--</td>-->
                            <!--<td>-->
                                <!--location-->
                            <!--</td>-->
                            <!--<td class="pr-text-right">-->
                                <!--<button class="button button&#45;&#45;primary">edit</button>-->
                            <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                    <!--</table>-->
                <!--</div>-->
            <!--</div>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>lists:</legend>-->
            <!--<div class="pr-flex pr-justify-around">-->
                <!--<ul class="pr-inline-block">-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<ul>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                    <!--</ul>-->
                <!--</ul>-->
                <!--<ul class="pr-inline-block">-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<ol>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                    <!--</ol>-->
                <!--</ul>-->
                <!--<ol class="pr-inline-block">-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<ul>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                    <!--</ul>-->
                <!--</ol>-->
                <!--<ol class="pr-inline-block">-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<li>hey</li>-->
                    <!--<ol>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                        <!--<li>hey</li>-->
                    <!--</ol>-->
                <!--</ol>-->
            <!--</div>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>headers:</legend>-->
            <!--<div class="pr-flex pr-justify-around">-->
                <!--<div class="pr-text-center">-->
                    <!--<h1 class="pr-mb-base">Header h1 </h1>-->
                    <!--<h2 class="pr-mb-base">Header h2 </h2>-->
                    <!--<h3 class="pr-mb-base">Header h3 </h3>-->
                    <!--<h4 class="pr-mb-base">Header h4 </h4>-->
                    <!--<h5 class="pr-mb-base">Header h5 </h5>-->
                    <!--<h6 class="pr-mb-base">Header h6 </h6>-->
                <!--</div>-->
                <!--<div class="pr-text-center">-->
                    <!--<h1 class="pr-mb-base header&#45;&#45;primary">Header Primary</h1>-->
                    <!--<h2 class="pr-mb-base header&#45;&#45;secondary">Header Secondary</h2>-->
                    <!--<h3 class="pr-mb-base header&#45;&#45;tertiary">Header Tertiary</h3>-->
                <!--</div>-->
            <!--</div>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>links:</legend>-->
            <!--<div class="pr-mb-base">-->
                <!--Sometimes texts <a href="">have links</a> just like this one.-->
            <!--</div>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>buttons:</legend>-->
            <!--<div>-->
                <!--<button class="button pr-mr-base">Button</button>-->
                <!--<button class="button pr-mr-base button&#45;&#45;primary">Primary</button>-->
                <!--<button class="button pr-mr-base button&#45;&#45;secondary">Secondary</button>-->
                <!--<button class="button pr-mr-base button&#45;&#45;success">Success</button>-->
                <!--<button class="button pr-mr-base button&#45;&#45;danger">Danger</button>-->
                <!--<button class="button pr-mr-base button&#45;&#45;warning">Warning</button>-->
                <!--<button class="button pr-mr-base button&#45;&#45;info">Info</button>-->
            <!--</div>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>Forms:</legend>-->
            <!--<div class="pr-mb-base">-->
                <!--<div class="pr-inline-block pr-mr-base">-->
                    <!--<label for="checkbox1" class="checkbox"><input id="checkbox1" name="checkbox" type="checkbox">Chekbox</label>-->
                    <!--<label for="checkbox2" class="checkbox"><input id="checkbox2" name="checkbox" type="checkbox">Chekbox</label>-->
                    <!--<label for="checkbox3" class="checkbox"><input id="checkbox3" name="checkbox" type="checkbox">Chekbox</label>-->
                <!--</div>-->
                <!--<div class="pr-inline-block">-->
                    <!--<label for="radio1" class="radio"><input id="radio1" name="radio" type="radio">Radio</label>-->
                    <!--<label for="radio2" class="radio"><input id="radio2" name="radio" type="radio">Radio</label>-->
                    <!--<label for="radio3" class="radio"><input id="radio3" name="radio" type="radio">Radio</label>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Input</label>-->
                <!--<input type="text" placeholder="Hello">-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Primary</label>-->
                <!--<input type="text" placeholder="Hello" class="input&#45;&#45;primary">-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Secondary</label>-->
                <!--<input type="text" placeholder="Hello" class="input&#45;&#45;secondary">-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Success</label>-->
                <!--<input type="text" placeholder="Hello" class="input&#45;&#45;success">-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Danger</label>-->
                <!--<input type="text" placeholder="Hello" class="input&#45;&#45;danger">-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Warning</label>-->
                <!--<input type="text" placeholder="Hello" class="input&#45;&#45;warning">-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Info</label>-->
                <!--<input type="text" placeholder="Hello" class="input&#45;&#45;info">-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Hello</label>-->
                <!--<div class="select">-->
                    <!--<select name="" id="">-->
                        <!--<option value="">hello worlddddd</option>-->
                        <!--<option value="">hello</option>-->
                    <!--</select>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div>-->
                <!--<label for="">Hello</label>-->
                <!--<textarea name="" id="" cols="30" rows="10"></textarea>-->
            <!--</div>-->
            <!--<div class="pr-text-right">-->
                <!--<button class="button pr-mr-base">cancel</button>-->
                <!--<button class="button button&#45;&#45;success">submit</button>-->
            <!--</div>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>code:</legend>-->
            <!--<div class="pr-mb-base">-->
                <!--In this sentence <code>there is some code</code> that can be displayed.-->
            <!--</div>-->
            <!--<pre>-->
                <!--<code>-->
                    <!--Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore dolorum eligendi esse et fugiat ipsum itaque laborum minima, molestiae optio provident reiciendis, saepe suscipit tenetur vel? Cum dolorum in provident?-->
                <!--</code>-->
            <!--</pre>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>misc:</legend>-->
            <!--<div class="pr-mb-base">-->
                <!--<img src="https://images.unsplash.com/photo-1539534161493-dc787e96425e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=642c3aa88c7f43a3573e48d9f5b56619&auto=format&fit=crop&w=1256&q=80"-->
                     <!--alt="">-->
                <!--<hr>-->
                <!--<a href="https://unsplash.com/photos/hZ45xlsL7kM" target="_blank">@jan_pd</a>-->
            <!--</div>-->
        <!--</fieldset>-->
        <!--<fieldset>-->
            <!--<legend>Component Exemples:</legend>-->

            <!--<fieldset>-->
                <!--<legend>cards:</legend>-->
                <!--<div class="pr-mb-base">-->
                    <!--&lt;!&ndash; Before exporting the component&ndash;&gt;-->
                    <!--<div class="pr-w-full lg:pr-flex">-->
                        <!--<div class="pr-h-48 lg:pr-h-auto lg:pr-w-48 pr-flex-none pr-bg-cover pr-rounded-t lg:pr-rounded-t-none lg:pr-rounded-l pr-text-center pr-overflow-hidden"-->
                             <!--style="background-image: url('https://tailwindcss.com/img/card-left.jpg')"-->
                             <!--title="Woman holding a mug">-->
                        <!--</div>-->
                        <!--<div class="pr-border-r pr-border-b pr-border-l pr-border-grey-light lg:pr-border-l-0 lg:pr-border-t lg:pr-border-grey-light pr-bg-white pr-rounded-b lg:pr-rounded-b-none lg:pr-rounded-r pr-p-4 flex pr-flex-col pr-justify-between pr-leading-normal">-->
                            <!--<div class="pr-mb-8">-->
                                <!--<p class="pr-text-sm pr-text-grey-dark pr-flex pr-items-center pr-mb-1">-->
                                    <!--<svg class="pr-fill-current pr-text-grey pr-w-3 pr-h-3 pr-mr-2"-->
                                         <!--xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">-->
                                        <!--<path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/>-->
                                    <!--</svg>-->
                                    <!--Members only-->
                                <!--</p>-->
                                <!--<div class="pr-text-black pr-font-bold pr-text-xl pr-mb-2">Can coffee make you a better-->
                                    <!--developer?-->
                                <!--</div>-->
                                <!--<p class="pr-text-grey-darker pr-text-base">Lorem ipsum dolor sit amet, consectetur-->
                                    <!--adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,-->
                                    <!--exercitationem praesentium nihil.</p>-->
                            <!--</div>-->
                            <!--<div class="pr-flex pr-items-center">-->
                                <!--<img class="pr-w-10 pr-h-10 pr-rounded-full pr-mr-4"-->
                                     <!--src="https://pbs.twimg.com/profile_images/885868801232961537/b1F6H4KC_400x400.jpg"-->
                                     <!--alt="Avatar of Jonathan Reinink">-->
                                <!--<div class="pr-text-sm">-->
                                    <!--<p class="pr-text-black pr-leading-none pr-mb-0">Jonathan Reinink</p>-->
                                    <!--<p class="pr-text-grey-dark pr-mb-0">Aug 18</p>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--&lt;!&ndash; After exporting the component&ndash;&gt;-->
                <!--<div class="pr-mb-base">-->
                    <!--<div class="card">-->
                        <!--<div class="card__image" title="Sunset" style="background-image: url('https://tailwindcss.com/img/card-top.jpg')"></div>-->
                        <!--<div class="card__content">-->
                            <!--<div class="card__content__main">-->
                                <!--<p class="card__content__main__availability">-->
                                    <!--<svg class="pr-fill-current pr-text-grey pr-w-3 pr-h-3 pr-mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">-->
                                        <!--<path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/>-->
                                    <!--</svg>-->
                                    <!--Members only-->
                                <!--</p>-->
                                <!--<div class="card__content__main__title">The Coldest Sunset</div>-->
                                <!--<p class="card__content__main__text">-->
                                    <!--Lorem ipsum dolor sit amet, consectetur-->
                                    <!--adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque,-->
                                    <!--exercitationem praesentium nihil.-->
                                <!--</p>-->
                            <!--</div>-->
                            <!--<div class="card__content__author">-->
                                <!--<img class="card__content__author__image"-->
                                     <!--src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4"-->
                                     <!--alt="Avatar of Jonathan Reinink">-->
                                <!--<div class="card__content__author__details">-->
                                    <!--<p class="card__content__author__title">Adam Wathan</p>-->
                                    <!--<p class="card__content__author__description">Aug 17</p>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</fieldset>-->
        <!--</fieldset>-->
    </div>
</template>

<script lang="ts">
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
            codemirror
        }
    })
    export default class Styleguide extends Vue {
        private styleguide: any = require('./styleguide.json');
        private cmOptions: any = {
            tabSize: 4,
            styleActiveLine: true,
            mode: 'htmlmixed',
            theme: 'monokai',
            lineNumbers: true,
            line: true,
            readOnly: true,
        };
        public created() {

        }

        public mounted() {

        }

        public bindListeners() {

        }

        public beforeDestroy() {

        }

        public destroyed() {

        }
    }
</script>

<style lang="scss">

</style>