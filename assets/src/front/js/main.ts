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
window.app = {
    Router:      {},
    Models:      {},
    Views:       {},
    Collections: {}
}

$(function() {
    window.app.Router = new AppRouter({ allowNavigation: true }); // NOTE: set allowNavigation to true if you're working on a single page app that will run in a browser
    Backbone.history.start({ pushState: true });
    console.log('App Ready to Rock');
});
