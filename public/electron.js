const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    x: 0,
    y: 100,
    transparent: true,
    frame: false,
    resizable: false,
    focusable: false,
    icon: path.join(__dirname, 'assets', 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
    },
    preload: path.join(__dirname, 'preload.js')
  });

  mainWindow.loadURL('http://localhost:3000');

  mainWindow.setAlwaysOnTop(true, 'screen');

  mainWindow.on('focus', () => {
    mainWindow.setAlwaysOnTop(true, 'screen');
  });

  mainWindow.on('blur', () => {
    mainWindow.setAlwaysOnTop(true, 'screen');
  });

  mainWindow.setIgnoreMouseEvents(false, { forward: true });
});