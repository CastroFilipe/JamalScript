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
	win = new BrowserWindow({width: 800, height: 600})
	
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

app.on('ready', createWindow)

// function construirCodigo(){

// 	frases = codigo.split("\n")                       
// 	frases = frases.filter(String)
// 	for (i = 0; i < frases.length; i++) {
// 		palavra[i] = frases[i].split(" ").filter(String)
// 		if(tipos.includes("" + palavra[i][0])){
// 			logicaVariavel(frases[i])
// 		}
// 	}    
// }
// function validarLinguagem(codigo_separado){
// 	if(tipos.includes("" + codigo_separado)){
// 		teste.push(codigo_separado)
// 	} else {
// 		return "erro";
// 	}
// }
// function logicaVariavel(linha){
// 	validar = linha.split(" ")
// 	if(validar[0] == "int"){
// 		if(!validar[1]){
// 			teste.push("Erro: Variavel sem nome")
// 		} else {
// 			teste.push("Variavel com nome")
// 		}
// 	}
// }
