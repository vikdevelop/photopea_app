const { app, BrowserWindow } = require('electron');
const { blockWindowAds } = require('@cliqz/adblocker-electron');
const path = require('path');

async function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 3840,
    height: 2160,
    icon: 'data/icons/com.github.vikdevelop.photopea_app.png',
    title: "Photopea",
    autoHideMenuBar: true,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'src/renderer/preload.js')
    }
  });

  // Load Photopea webapp
  mainWindow.loadURL('https://photopea.com');

  // Block ads
  await blockWindowAds(mainWindow);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
