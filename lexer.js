const automatos = require('./automatos.js');

//funcao que é exportada e está visível a outros modulos.
function lex(inputString) {

    let tokens = [];

    /* As duas linhas abaixo removem todos os espacos em branco contidos na 
     * string inputString.
     * Ex: inputString = 'int abc=         3;'
     * ao final, teremos em arrayPalavras: [ 'int', 'abc=', '3;' ]
     * um array livre de espaços e apenas com as palavras 
    */
    const arrayAux = inputString.split(/\s+/g);
    const arrayPalavras = arrayAux.filter(word => word.length > 0);

    //percorre todas as palavras do array e chama a funcao em cada palavra
    arrayPalavras.forEach((palavra, indiceNoArray, arrayPercorrido) =>{
        //o objetivo dessa funcao é percorrer cada caractere de cada palavra do array e definir sua classe

        //for que percorer cada caractere da palavra
        for(let i = 0; i < palavra.length; i++){
            let aux = i;

            if(automatos.isOperator(palavra[i])){

                //retorna um objeto {type: type, vaule: c}
                tokens.push(automatos.qualOperador(palavra[i],palavra[i+1]));
                
                //avança i++ caso o operador recem adicionado possua dois digitos como ==, <=, != etc, evitando assim que o programa engula caracteres
                if(tokens[tokens.length-1].value.length == 2){i++}

            } else if(automatos.isDigit(palavra[i])){
                let acumuladorDigitos = '';

                do{
                    acumuladorDigitos = acumuladorDigitos.concat(palavra[i])
                    i++;
                } while(automatos.isDigit(palavra[i]))

                i--;//necessário para o i++ do for não engolir um caractere

                tokens.push({type:'number', value: acumuladorDigitos});

            } else if(automatos.isString(palavra[i])){
                let acumuladorString = '';
                do{
                    acumuladorString = acumuladorString.concat(palavra[i])
                    i++;
                } while(automatos.isString(palavra[i]))
                i--;//necessário para o i++ do for não engolir um caractere
                tokens.push({type:'string', value: acumuladorString});
            }
        }
             
    });

    return tokens;
}//fim lex


module.exports = { lex };