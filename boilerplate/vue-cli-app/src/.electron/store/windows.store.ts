const windows = {
    namespaced: true,
    state: {
        main: null,
    },
    getters: {},
    mutations: {
        setMain(state: any, value: any) {
            state.main = value;
        },
        quit(state: any) {
            state.main = null;
        }
    },
    actions: {
        setMain({ commit }: any, value: any) {
            commit('setMain', value);
        },
        quit({commit}: any) {
            commit('quit');
        }
    },
};
export default windows;
