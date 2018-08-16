const electron = require('electron')

const{app, BrowserWindow, ipcMain} = electron

let win;

var linguagem = new Array("String", "int");
var codigo;
var frases = new  Array();
var palavra = new Array();

function createWindow (){

        //Cria a janela
        win = new BrowserWindow({width: 800, height: 600})

        //Carrega a pagina
        win.loadFile('index.html')

}


ipcMain.on('input:add', function(e, input){
       codigo = input
       validateLanguage();
})

app.on('ready', createWindow)

function validateLanguage(){

        var teste
        if (codigo.indexOf(";")) {
                frases = codigo.split(";")
                frases = frases.filter(String)

                // frases.forEach(frase => {
                //         palavra = frase.split(" ")
                // });
                for (var i = 0; i < frases.length; i++) {
                        palavra[i] = frases[i].split(" ").filter(String)
                }
        }
        
         win.webContents.send('input:add', palavra);
}