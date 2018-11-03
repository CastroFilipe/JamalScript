const automatos = require('./automatos.js'); //necessário para usar os metodos reconhecedores

//funcao que é exportada e está visível a outros modulos.
function lex(inputString) {

    /* As duas linhas abaixo removem todos os espacos em branco contidos na 
     * string inputString.
     * Ex: inputString = 'int abc   = 3;  int abc=2';
     * ao final, teremos em arrayPalavras: [ 'int', 'abc', '=', '3;', 'int', 'abc=2;' ]
     * um array livre de espaços e apenas com as palavras 
    */
    const arrayAux = inputString.split(/\s+/g);
    const arrayPalavras = arrayAux.filter(word => word.length > 0);
    //console.log(arrayPalavras);//teste

    //percorre todas as palavras do array e chama a funcao em cada palavra
    arrayPalavras.forEach((palavra, indiceNoArray, arrayPercorrido) =>{
        //o objetivo dessa funcao é percorrer cada caractere de cada palavra do array e definir sua classe

        //for que percorer cada caractere da palavra
        for(let i in palavra){
            if(automatos.isOperator(palavra[i])){

            } else if(automatos.isDigit(palavra[i])){

            } else if(automatos.isString(palavra[i])){

            }
        }

        
        
    });

}//fim lex

module.exports = { lex };