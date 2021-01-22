const { app, BrowserWindow, globalShortcut, Menu} = require('electron');
const AutoLaunch = require('auto-launch');
const ipcMain = require('electron').ipcMain;
const path = require('path');
const isDev = require('electron-is-dev');
const { menuTemplate } = require('./menuTemplate');

let mainWindow;

function createWindow() {
 
    mainWindow = new BrowserWindow({
        alwaysOnTop: true,
        show: false,
        title: '',
        webPreferences: { nodeIntegration: true, webSecurity: false },
        name: ''
    });

    //mainWindow.setIcon(isDev ? path.join(__dirname, '../src/assets/tsn.png') : path.join(__dirname, './tsn.png'))

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    
    const menu = Menu.buildFromTemplate(menuTemplate());
    Menu.setApplicationMenu(menu);
    
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    
    globalShortcut.register('Escape', () => {
        console.log('Escape is pressed');
        mainWindow.setMenuBarVisibility(true);
        return mainWindow.setFullScreen(false);
    })

    mainWindow.on('enter-full-screen', ()=> {
        console.log('main window entered full screen');
        return mainWindow.setMenuBarVisibility(false);
    });

    mainWindow.on('ready-to-show', ()=> {
        console.log('browser is ready to be shown.');
        mainWindow.show();
        mainWindow.setAlwaysOnTop(true, 'screen-saver');
    })

    setInterval(()=> {
        mainWindow.setAlwaysOnTop(true, 'screen-saver');
        // let currentUrl = mainWindow.webContents.getURL();
        // currentUrl = currentUrl.toString();
        // if (!currentUrl.includes('web-player')) return;
        
        if (mainWindow.isMinimized()) {
            mainWindow.maximize();
            mainWindow.setFullScreen(true);
        };

        if (!mainWindow.isFullScreen()) mainWindow.setFullScreen(true);
        return;
    }, 30000)

    mainWindow.on('closed', () => mainWindow = null);
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit()
});

app.on('will-quit', function(){

    globalShortcut.unregister('Escape');
  
    globalShortcut.unregisterAll();
});

// const redirectRenderer = (route) => {
//     return mainWindow.webContents.send('redirect', route);
// };


ipcMain.handle('fullscreen-player', async () => {
    console.log('fullscreening the player');
    mainWindow.maximize();
    mainWindow.setMenuBarVisibility(false);
    return mainWindow.setFullScreen(true);
});

var autoLauncher = new AutoLaunch({
    name: "Windows-Kiosk-App"
});

autoLauncher.isEnabled().then(function(isEnabled) {

    if (isEnabled && !isDev) return;
     autoLauncher.enable();
  }).catch(function (err) {
    console.log(err)
    throw err;
});