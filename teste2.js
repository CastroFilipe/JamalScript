const texto = ['a+1','==','c']

const isIgual = (c, c2) => /=/.test(c) && /[^=]/.test(c2) ? {type: 'igual', value: c} : false;
const isComparacao = (c, c2) => /=/.test(c) && /=/.test(c2) ? {type: 'comparacao', value: c.concat(c2)} : false;

texto.forEach((palavra, index, array)=>{
    
    for(let i = 0; i < palavra.length; i++){
        console.log(isIgual(palavra[i], palavra[i+1]));
/*
        if(isComparacao(palavra[i], palavra[i+1])){
            i++;
        }
*/
    }
    
});



