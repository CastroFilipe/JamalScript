const electron = require('electron')

const{app, BrowserWindow, ipcMain} = electron

let win;

function createWindow (){

        //Cria a janela
        win = new BrowserWindow({width: 800, height: 600})

        //Carrega a pagina
        win.loadFile('index.html')

}


ipcMain.on('input:add', function(e, input){
        win.webContents.send('input:add', input);
})

app.on('ready', createWindow)
