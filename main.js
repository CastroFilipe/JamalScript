const electron = require('electron')
const lexer = require('./lexer.js')

const{app, BrowserWindow, ipcMain} = electron

let win;

//if [condicao]+([operador]+condicao+)* {(algo)*} else {}
var codigo;
var palavra = new Array();
var teste;

function createWindow (){
	
	//Cria a janela
	win = new BrowserWindow({width: 1280, height: 720})
	
	//Carrega a pagina
	win.loadFile('index.html')
	
}


ipcMain.on('input:add', function(e, input){   
	teste = new Array()
	palavra.length = 0
	if(!input){
		win.webContents.send('input:add', "Não foi digitado código")
		return
	}
	codigo = input.toLowerCase();
	// construirCodigo();

	if (lexer){
		teste.push(JSON.stringify(lexer.lex(codigo)))
	} else teste.push("ene")
	

	win.webContents.send('input:add', teste)
})

app.on('ready', createWindow);
