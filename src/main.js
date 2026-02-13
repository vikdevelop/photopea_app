const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');
const { ElectronBlocker } = require('@ghostery/adblocker-electron');
const fetch = require('cross-fetch');

app.setName('photopea');
const devMode = false;

function createWindow() {
    const mainWindowState = windowStateKeeper({
        defaultWidth: 1366,
        defaultHeight: 768,
    });

    const win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        icon: "/app/share/icons/hicolor/128x128/apps/com.github.vikdevelop.photopea_app.png",
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    win.setMenuBarVisibility(false);
    mainWindowState.manage(win);

    if (devMode) {
        win.setMenuBarVisibility(true);
        win.webContents.openDevTools();
    }

    console.log('Loading Photopea with #8887');
    win.loadURL('https://www.photopea.com/#8887');

    return win;
}

app.whenReady().then(() => {
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
        console.log('Network adblocker locked in. No tracking allowed.');
    }).catch(err => console.error('Failed to load the blocker:', err));

    app.on('browser-window-created', (_, window) => {
        window.setMenuBarVisibility(false);
        window.autoHideMenuBar = true;
    });

    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
