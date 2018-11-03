//ARQUIVO APENAS PARA FAZER UNS TESTES.

const jamalscript = 'int   abc == 2;';

const arrayAux = jamalscript.split(/\s+/sg);
const arrayPalavras = arrayAux.filter(word => word.length > 0);

console.log(arrayPalavras);

/*
//metodo para remover espaços em branco extras
const novaString = jamalscript.replace(/\s{2,}/g, ' ');
console.log(novaString);
*/


var arrayResult = [1,3];

arrayPalavras.forEach((palavra, indice, arrayPercorrido) => {
    let palavraTotal = '';

    for(let i in palavra){
        palavraTotal += palavra[i]; 
    }
    console.log(palavraTotal);
    //console.log(arrayResult);
    arrayResult.push(palavraTotal)
});

 
console.log(arrayResult);