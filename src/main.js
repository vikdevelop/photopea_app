const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const windowStateKeeper = require('electron-window-state');

// Set the app name
app.setName('photopea');

// Variable to control if the app is in development mode
const devMode = false;

// Function to create the main browser window
function createWindow() {
    // Retrieve and manage the window state (position and size) from previous session
    const mainWindowState = windowStateKeeper({
        defaultWidth: 1366, // Default width of the window
        defaultHeight: 768, // Default height of the window
    });

    // Create the main browser window with the loaded window state (position, size)
    const win = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        icon: "/app/share/icons/hicolor/128x128/apps/com.github.vikdevelop.photopea_app.png", // Set window icon
        autoHideMenuBar: true, // Automatically hide the menu bar
        webPreferences: {
            nodeIntegration: false, // Disable Node.js integration for security
            contextIsolation: true, // Isolate context for security
        },
    });

    // Hide the menu bar
    win.setMenuBarVisibility(false);

    // Manage the window state (position and size) on window resize or move
    mainWindowState.manage(win);

    // Development mode settings (if enabled)
    if (devMode) {
        win.setMenuBarVisibility(true); // Show the menu bar in development mode
        win.webContents.openDevTools(); // Open Developer Tools in development mode
    }

    // Log message when loading Photopea
    console.log('Loading Photopea with #8887');
    // Load the Photopea URL with a specific identifier (e.g., #8887)
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
