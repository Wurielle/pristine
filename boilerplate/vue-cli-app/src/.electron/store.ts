import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex';
Vue.use(Vuex);
// const log = require('electron-log');
import windows from './store/windows.store';
const store = new Vuex.Store({
    strict: true,
    state: {
        package: null,
    },
    getters: {},
    mutations: {
        setPackage(state: any, value: any) {
            state.package = value;
        }
    },
    actions: {
        setPackage({commit}: any, value: any) {
            commit('setPackage', value);
        }
    },
    modules: {
        windows,
    }
});
store.subscribe((mutation: any, state: any) => {
    // log.info('VueX Mutation:', mutation.type, mutation.payload);
});
export default store;
