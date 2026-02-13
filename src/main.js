const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');

// Set the app name
app.setName('photopea');

// Variable to control if the app is in development mode
const devMode = false;

// Function to create the main browser window
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
            contextIsolation: true
        },
    });

    win.setMenuBarVisibility(false);
    mainWindowState.manage(win);

    if (devMode) {
        win.setMenuBarVisibility(true);
        win.webContents.openDevTools();
    }

    win.webContents.on('dom-ready', () => {
        const injectAdsBlocker = `
            const script = document.createElement('script');
            script.textContent = \`
                function resize() {
                    const appEl = document.querySelector(".app");
                    const appDiv = document.querySelector(".app > div");
                    if (!appEl || !appDiv) return; // Safety check, kdyby se DOM nenačetl
                    
                    const adWidth = appEl.offsetWidth - appDiv.offsetWidth;
                    Object.defineProperty(window, "innerWidth", {
                        get() {
                            return parseInt(document.documentElement.offsetWidth, 10) + adWidth;
                        },
                    });
                    window.dispatchEvent(new Event("resize"));
                }
                
                const observer = new MutationObserver((mutations) => {
                    for (const mutation of mutations) {
                        for (const node of mutation.addedNodes) {
                            if (node.nodeType === 1 && node.matches(".app *")) {
                                observer.disconnect();
                                resize();
                                return;
                            }
                        }
                    }
                });
                
                if (document.body) {
                    observer.observe(document.body, { childList: true, subtree: true });
                }
            \`;
            document.head.appendChild(script);
        `;

        win.webContents.executeJavaScript(injectAdsBlocker)
            .then(() => console.log('Ad-block skript úspěšně injektnut!'))
            .catch(err => console.error('Ups, nepovedlo se injektnout skript:', err));
    });

    console.log('Loading Photopea with #8887');
    win.loadURL('https://www.photopea.com/#8887');

    return win;
}

// When the app is ready, create the window
app.whenReady().then(() => {

    // Set event listener for when a new browser window is created
    app.on('browser-window-created', (_, window) => {
        window.setMenuBarVisibility(false); // Ensure menu bar is hidden
        window.autoHideMenuBar = true; // Set menu bar to auto-hide
    });

    // Create the main window
    createWindow();
});

// Handle window close event
app.on('window-all-closed', () => {
    // On non-Mac platforms, quit the app when all windows are closed
    if (process.platform !== 'darwin') app.quit();
});

// Handle app activation event (for example, when clicking on the dock icon)
app.on('activate', () => {
    // If no windows are open, create a new one
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
