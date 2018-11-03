const automatos = require('./automatos.js'); //necessário para usar os metodos reconhecedores

//funcao que Recebe dois valores e converte em um objeto
//const objTokens = (type, value) => {type, value};

//funcao que é exportada e está visível a outros modulos.
function lex(inputString) {

    let tokens = [];

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
        for(let i = 0; i < palavra.length; i++){
            let aux = i;

            if(automatos.isOperator(palavra[i])){

                //retorna um objeto {type: type, vaule: c}
                tokens.push(automatos.qualOperador(palavra[i],palavra[i+1]));
                if(tokens[tokens.length-1].type == 'comparacao'){i++}//avança i++ caso o ultimo elemento de tokens seja comparacao

            } else if(automatos.isDigit(palavra[i])){
                let acumuladorDigitos = '';

                do{
                    acumuladorDigitos = acumuladorDigitos.concat(palavra[i])
                    console.log(palavra[i], acumuladorDigitos)
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