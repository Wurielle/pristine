'use strict';
const pkg = require('../../package.json');
import log from 'electron-log';
import path from 'path';
import fs from 'fs';
import store from './store';
import Platform from '../platform';
import {
    app,
    BrowserWindow,
    protocol
} from 'electron';
import {
    createProtocol,
    installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';
const isDevelopment = process.env.NODE_ENV !== 'production';

if (process.platform === 'win32') {
    app.commandLine.appendSwitch('high-dpi-support', 'true');
    app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true});

store.dispatch('setPackage', pkg);
log.info('Is Dev', isDevelopment);
log.info('App starting...');
log.info('App Version', store.state.package.version);
log.info('Node Version', process.version);
log.info('Electron Version', process.versions.electron);
log.info('All versions', process.versions);

//------------------------------------------------------------------------------
// Critical Error Case
//------------------------------------------------------------------------------
import { autoUpdater } from 'electron-updater';

function checkForUpdates(forceDownload = false) {
    autoUpdater.autoDownload = forceDownload;
    if (isDevelopment) {
        autoUpdater.setFeedURL(`http://55.55.55.1:9000/${store.state.package.name}/`);
    }
    autoUpdater.checkForUpdates();
}

function downloadUpdate() {
    autoUpdater.downloadUpdate();
}

process.on('uncaughtException', (error: any) => {
    checkForUpdates(true);
});

Platform.$on('update-download', () => {
    log.info('Starting Update Download');
    downloadUpdate();
});

Platform.$on('update-install', () => {
    log.info('Installing Update Now');
    setTimeout(() => {
        autoUpdater.quitAndInstall();
    }, 5000);
});

// ------------------------------------------------------------------------
// App Methods
//------------------------------------------------------------------------------
function createWindows() {
    createMainWindow();
}

function createMainWindow() {
    // Main window
    const mainWindow = new BrowserWindow({
        width: 1366,
        height: 768,
        show: false,
        center: true,
        maximizable: true,
        resizable: true,
        icon: path.resolve(__dirname, '../../build/icon-32x32.png')
    });
    store.dispatch('windows/setMain', mainWindow);
    store.state.windows.main.setMenu(null);

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        store.state.windows.main.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) store.state.windows.main.webContents.openDevTools();
    } else {
        createProtocol('app');
        // Load the index.html when not in development
        store.state.windows.main.loadURL('app://./index.html');
    }
    store.state.windows.main.once('ready-to-show', () => {
        store.state.windows.main.show();
        log.info('Started Auto Updater from main process');
        setTimeout(() => {
            checkForUpdates();
        }, 5000);
    });
    store.state.windows.main.on('closed', () => {
        quit();
    });
}

function quit() {
    store.dispatch('windows/quit');
}

function minimize() {
    store.state.windows.main.minimize();
}

function maximize() {
    store.state.windows.main.maximize();
}

//------------------------------------------------------------------------------
// App Events
//------------------------------------------------------------------------------

Platform.$on('delete-file', ({value, resolve, reject}: any) => {
    fs.unlink(value, (err: any) => {
        if (err) {
            reject(err);
        } else {
            resolve();
        }
    });
});

Platform.$on('file-exists', ({value, resolve, reject}: any) => {
    const fsPath = path.join(app.getPath('userData'), value);
    fs.exists(fsPath, (exists: boolean) => {
        if (!exists) {
            resolve(null);
        } else if (exists) {
            resolve(fsPath);
        }
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (store.state.windows.main === null) {
        createWindows();
    }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        await installVueDevtools();
    }
    createWindows();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data: any) => {
            if (data === 'graceful-exit') {
                app.quit();
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit();
        });
    }
}

//------------------------------------------------------------------------------
// Auto updates
//------------------------------------------------------------------------------
function sendUpdateStatus(value: any) {
    log.info(value);
    Platform.commit('update-status', value, store.state.windows.main);
}

function inform(channel: string, value = null) {
    Platform.commit(channel, value, store.state.windows.main);
}

autoUpdater.on('checking-for-update', () => {
    sendUpdateStatus('Checking for update...');
});

autoUpdater.on('update-available', (info: any) => {
    sendUpdateStatus('Update available.');
    inform('update-available');
});

autoUpdater.on('update-not-available', (info: any) => {
    sendUpdateStatus('Update not available.');
});

autoUpdater.on('error', (err: any) => {
    sendUpdateStatus('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj: any) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendUpdateStatus(log_message);
});

autoUpdater.on('update-downloaded', (info: any) => {
    sendUpdateStatus('Update downloaded');
    inform('update-downloaded');
});


