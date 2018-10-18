import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import './element-variables.scss';

import '@/styles/main.scss';

let styleguide;
if (process.env.NODE_ENV === 'development') {
    styleguide = require('@/styleguide/Styleguide.vue').default;
    Vue.component('Styleguide', styleguide);
}

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
