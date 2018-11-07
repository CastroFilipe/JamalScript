const automatos = require('./automatos');


const arrayTokens = [{type: "tipo", value: "valor"}];

const parse =(arrayTokens) => {//vai receber o array de tokens feito no lex

    if(automatos.isPalavraReservada(arrayTokens[0].type)){
        if(!automatos.isPalavraReservada(arrayTokens[1].type)){
            // erro, duas palavras reservadas seguidas
        } else if(automatos.isOperator(arrayTokens[1].type)){
            //erro. Não existe expresão que contenha uma palavra reservada seguida de um operador
            //tem sim print{ }. operador { }. vamos ter que retirar chaves, cochetes e alguns outros da categoria de operadores e criar uma nova.
            
        }
    }
}



       
    


module.exports = {parse}