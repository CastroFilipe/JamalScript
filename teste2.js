//apenas para testes

const texto = ' jamastring   text = "abc 145  4"'
const arrayAux = []
let acumuladorPalavra = '';   

for(let i = 0; i < texto.length; i++){
     
    if(texto[i] != /\"/){
        if(texto[i] === /\s/){
           
        } else {
            do {
                acumuladorPalavra += texto[i]
                i++;    
            } while (texto[i] =! /\"/);
        }
        
    } else {

    }

}
arrayAux = texto.split(/\s+/g);
console.log(arrayAux);
const arrayPalavras = arrayAux.filter(word => word.length > 0);

console.log(arrayPalavras);
