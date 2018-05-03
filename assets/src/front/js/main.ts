/// <reference path="./typings/vue.d.ts" />
if((process as any).env.NODE_ENV.trim() !== 'production'){
    var stylesheet = document.querySelector('link.main');
    stylesheet.parentNode.removeChild(stylesheet);
}
// Vue
import Vue from 'vue'
import VueRouter from 'vue-router'
// const Test = require('./views/components/test/test.vue')
Vue.use(VueRouter)

// Sass imports
import '../sass/main.sass';

// JS imports -- Allows you to see what I used for this project (Also check those from webpack.ProvidePlugin() in 'webpack.config.js')
import 'gsap';
import 'gsap/ScrollToPlugin';
import 'gsap/Draggable';
import * as $ from 'jquery';
import * as Backbone from 'backbone';
import * as _ from 'underscore';
import { AppRouter } from './routers/app_router.ts'

import { default as Test } from './views/components/test/test.vue'

// Set imports to the Global object
declare global {
    interface Window {
        $:        any;
        _:        any;
        Backbone: any;
        app:      any;
    }
}
window.$        = $;
window._        = _;
window.Backbone = Backbone;

// JS
// var Hal = require('backbone-hateoas');
// Hal.contentType = 'application/json';
window.app = {
    Router:      {},
    Models:      {},
    Views:       {},
    Collections: {}
}

$(function() {
    const Foo = { template: '<div>foo</div>' }
    const Bar = { template: '<div>bar</div>' }
    const routes = [
        { path: '/foo', component: Foo },
        { path: '/bar', component: Test }
    ]
    const router = new VueRouter({
        mode: 'history',
        routes // short for `routes: routes`
    })
    const app = new Vue({
        router
    }).$mount('#app')
    // window.app.Router = new AppRouter({ allowNavigation: true }); // NOTE: set allowNavigation to true if you're working on a single page app that will run in a browser
    // Backbone.history.start({ pushState: true });
    console.log('App Ready to Rock');
});
