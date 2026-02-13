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

    win.webContents.on('dom-ready', () => {
        // 1. CSS Nuke: Zkusíme natvrdo skrýt známé třídy reklam
        win.webContents.insertCSS(`
            .sbar { display: none !important; }
            .flexrow { width: 100% !important; }
        `).catch(err => console.error('CSS injection failed:', err));

        // 2. JS Nuke: Brute force smyčka, která přežije i kliknutí na "New Project"
        const injectAdsBlocker = `
            setInterval(() => {
                const appEl = document.querySelector(".app");
                const appDiv = document.querySelector(".app > div");
                
                if (appEl && appDiv) {
                    // Spočítej reálnou šířku bez reklamního panelu
                    const adWidth = appEl.offsetWidth - appDiv.offsetWidth;
                    
                    if (adWidth > 0) {
                        // Přepisování vnitřních proměnných okna, aby si canvas myslel, že je okno větší
                        Object.defineProperty(window, "innerWidth", {
                            configurable: true,
                            get() {
                                return parseInt(document.documentElement.offsetWidth, 10) + adWidth;
                            },
                        });
                        window.dispatchEvent(new Event("resize"));
                    }
                }
            }, 1000); // Každou vteřinu zkontroluje, jestli se UI nerozpadlo
        `;

        win.webContents.executeJavaScript(injectAdsBlocker)
            .then(() => console.log('UI nuke locked in!'))
            .catch(err => console.error('JS nuke failed:', err));
    });

    console.log('Loading Photopea with #8887');
    win.loadURL('https://www.photopea.com/#8887');

    return win;
}

app.whenReady().then(() => {
    // Zapnutí síťového adblockeru (Ghostery)
    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
        console.log('Network adblocker enabled, chief.');
    });

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
