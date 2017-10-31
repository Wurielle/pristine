// Sass imports
import '../sass/main.sass';

// JS imports -- Allows you to see what I used for this project (Also check those from webpack.ProvidePlugin() in 'webpack.config.js')
import 'gsap';
import 'gsap/ScrollToPlugin';
import 'gsap/Draggable';
import * as $ from 'jquery';
import * as backbone from 'backbone';
import * as _ from 'underscore';

// Set imports to the Global object
declare global {
    interface Window {
        $: any;
        _: any;
        backbone: any;
    }
}
window.$ = $;
window._ = _;
window.backbone = backbone;

// JS
$(function() {
    console.log('App Super Ready');
});
