const electron = require('electron')

const{app, BrowserWindow} = require('electron')

function createWindow (){

        //Cria a janela
        win = new BrowserWindow({width: 800, height: 600})

        //Carrega a pagina
        win.loadFile('index.html')

}

app.on('ready', createWindow)

  
