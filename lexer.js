const automatos = require('./automatos.js');


    /* funcao removerEspacos que remove todos os espacos em branco contidos 
     * na string inputString com exceçao dos espaços dentro de " ".
     * Ex: inputString = 'string       abc=       "ola amigo";'
     * ao final, retorna: [ 'string', 'abc=', '"ola amigo"', ';' ]
     */
const removerEspacos = (texto)=>{
    const arrayAux = []

    for(let i = 0; i < texto.length; i++){
        let acumuladorPalavra = '';   
    
        if(/\s/.test(texto[i])){
            //não faz nada só espera o for acrescentar i++ para pular o espaco
        } else if(/"/.test(texto[i])){
    
            do {//vai acumular tudo que estiver entre " " inclusive espacos
                acumuladorPalavra += texto[i]
                i++;    
            } while (!/"/.test(texto[i]) && i<texto.length);
            
            if(/"/.test(texto[i])){
                acumuladorPalavra += texto[i];
            }
            
            arrayAux.push(acumuladorPalavra);
    
        } else {
            do {
                acumuladorPalavra += texto[i]
                i++;    
            } while (!/"/.test(texto[i]) && !/\s/.test(texto[i]) && i<texto.length);
            arrayAux.push(acumuladorPalavra);
            i--;
        }
    }

    return arrayAux;
}

//funcao que é exportada e está visível a outros modulos. Retorna o array de tokens
function lex(inputString) {

    let tokens = [];

    const arrayPalavras = removerEspacos(inputString);

    //percorre todas as palavras do array e chama a funcao em cada palavra
    arrayPalavras.forEach((palavra, indiceNoArray, arrayPercorrido) =>{
        //o objetivo dessa funcao é percorrer cada caractere de cada palavra do array e definir sua classe

        //for que percorer cada caractere da palavra
        for(let i = 0; i < palavra.length; i++){

            if(automatos.isAspas(palavra[0])){//se for uma jamastring_text, já adiciona a palavra inteira e vai para a proxima
                tokens.push(automatos.qualString(palavra));
                //tokens.push({type: "jamastring_texto", value: palavra});
                i = palavra.length;
            } else if(automatos.isOperator(palavra[i])){

                //retorna um objeto {type: type, vaule: c}
                tokens.push(automatos.qualOperador(palavra[i],palavra[i+1]));
                
                //avança i++ caso o operador recem adicionado possua dois digitos como ==, <=, != etc, evitando assim que o programa engula caracteres
                if(tokens[tokens.length-1].value.length == 2){i++}

            } else if(automatos.isDigit(palavra[i])){
                let acumuladorDigitos = '';

                do{//reconhece números inteiros
                    acumuladorDigitos = acumuladorDigitos.concat(palavra[i])
                    i++;
                } while(automatos.isDigit(palavra[i]))

                if(automatos.isPonto(palavra[i])){//necessário para reconhecer numeros com casa decimal
                    
                    do{
                        acumuladorDigitos = acumuladorDigitos.concat(palavra[i])
                        i++;
                    } while(automatos.isDigit(palavra[i]))

                    tokens.push({type:'flutuante', value: acumuladorDigitos});

                } else{
                    tokens.push({type:'number', value: acumuladorDigitos});
                }
                i--;//necessário para o i++ do laço for não engolir um caractere

            } else if(automatos.isString(palavra[i])){
                let acumuladorString = '';
                do{
                    acumuladorString = acumuladorString.concat(palavra[i])
                    i++;
                } while(automatos.isString(palavra[i]))
                i--;//necessário para o i++ do for não engolir um caractere

                //metodo qual string? retorna um objeto {type, valor} com o tipo da string passada como parametro
                tokens.push(automatos.qualString(acumuladorString));
        
            }
        }
             
    });
    tokens.push("end");
    return tokens;
}//fim lex


module.exports = { lex };