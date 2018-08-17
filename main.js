const electron = require('electron')

const{app, BrowserWindow, ipcMain} = electron

let win;

var linguagem = new Array("if", "else", "for", "while");
var tipos = new Array("int", "float", "string", "boolean")
var operadoresAritmeticos = new Array("+", "-", "/", "*", "=")
var operadoresLogicos = new Array("&&", "||", ">=", ">", "<=", "<", "==", "!=")
var separadores = new Array("(", "{", "\"", ")", "}", ",", ".")
//if [condicao]+([operador]+condicao+)* {(algo)*} else {}
var codigo;
var frases = new  Array();
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
        construirCodigo();
        win.webContents.send('input:add', teste)
})

app.on('ready', createWindow)

function construirCodigo(){
        
        frases = codigo.split("\n")                       
        frases = frases.filter(String)
        for (i = 0; i < frases.length; i++) {
               palavra[i] = frases[i].split(" ").filter(String)
               validarLinguagem(palavra[i]);
        }
                
        
}

function validarLinguagem(codigo_separado){
       
        if(linguagem.includes("" + codigo_separado)){
                teste.push(codigo_separado)
        } else {
                teste.push("erro")
        }

}