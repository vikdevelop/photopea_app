const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 3840,
    height: 2160,
    icon: 'data/icons/com.github.vikdevelop.photopea_app.png',
    title: "Photopea",
    autoHideMenuBar: 'true',
    transparent: 'true',
    webPreferences: {
      preload: path.join(__dirname, 'renderer/preload.js')
    }
  })

  mainWindow.loadURL('https://photopea.com')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
