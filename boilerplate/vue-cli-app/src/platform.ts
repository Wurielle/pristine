import Vue from 'vue';

let isElectron = false;
let isNativeScript = false;
const isNode = typeof window === 'undefined';
let electron: any;
let promiseIpc: any;
try {
    electron = require('electron');
    promiseIpc = require('electron-promise-ipc');
    isElectron = true;
} catch (e) {
    isElectron = false;
}
console.log('Platform information:', {isElectron, isNativeScript, isNode});
const Platform = new Vue({
    created() {
        this.addListeners();
    },
    methods: {
        // Create commits
        commit(channel: string, value: any, windows: any = null) {
            if (isElectron) {
                // check if is main process
                if (isNode) {
                    if (windows) {
                        if (typeof windows === 'object' && Array.isArray(windows)) {
                            windows.forEach((window) => {
                               window.webContents.send('commit', {channel, value});
                            });
                        } else if (typeof windows === 'object') {
                            windows.webContents.send('commit', {channel, value});
                        }
                    } else {
                        console.warn('A third parameter containing the target window is required. ' +
                            'No event has been sent.');
                    }
                } else {
                    electron.ipcRenderer.send('commit', {channel, value});
                }
            } else {
                this.$emit(channel, value);
            }
        },
        // Create dispatches
        dispatch(channel: string, value: any) {
            return new Promise((resolve, reject) => {
                if (isElectron) {
                    promiseIpc.send('dispatch', {channel, value})
                        .then((res: any) => resolve(res))
                        .catch((err: any) => reject(err));
                } else {
                    this.$emit(channel, {value, resolve, reject});
                }
            });
        },
        // Intercepts all commits/dispatches and redistributes them
        addListeners() {
            if (isElectron) {
                electron[isNode ? 'ipcMain' : 'ipcRenderer'].on('commit', (e: any, {channel, value}: any) => {
                    this.$emit(channel, value);
                });
                promiseIpc.on('dispatch', ({channel, value}: any) => {
                    return new Promise((resolve, reject) => {
                        this.$emit(channel, {
                            value,
                            resolve,
                            reject
                        });
                    });
                });
            }
        },
    },
});

export default Platform;
