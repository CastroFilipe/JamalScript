//apenas para testes



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
        }
    }

    return arrayAux;
}

function lex(){

    const texto = `func pessoa () {
        println("oi")
     }`
    let novoarray = removerEspacos(texto);
    console.log(novoarray);
}

lex();


//console.log(arrayAux);
/*
arrayAux = texto.split(/\s+/g);
console.log(arrayAux);
const arrayPalavras = arrayAux.filter(word => word.length > 0);

console.log(arrayPalavras);
*/