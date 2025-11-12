const { app, BrowserWindow } = require('electron');
const path = require('path');

const devMode = false;

async function createWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
        },
    });

    if (devMode) {
        win.setMenuBarVisibility(true);
        win.webContents.openDevTools();
    } else {
        win.setMenuBarVisibility(false);
    }

    win.on('close', () => {
        win.destroy();
    });

    console.log('Loading Photopea with #8887');
    await win.loadURL('https://www.photopea.com/#8887');

}

app.whenReady().then(() => {
    createWindow().catch(err => console.error('App failed:', err.message));
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow().catch(err => console.error('Reactivation failed:', err.message));
    }
});
