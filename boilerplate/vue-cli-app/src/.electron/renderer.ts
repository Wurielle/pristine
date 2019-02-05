import { remote, webFrame } from 'electron';

webFrame.setZoomFactor(1);
webFrame.setZoomLevelLimits(1, 1);
webFrame.setVisualZoomLevelLimits(1, 1);
webFrame.setLayoutZoomLevelLimits(0, 0);

// Open Dev Tools with F12
document.addEventListener("keydown", (e) => {
    if (e.which === 123) {
        remote.getCurrentWindow().toggleDevTools();
    }
});