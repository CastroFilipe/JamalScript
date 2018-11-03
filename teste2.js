//apenas para testes

const texto = ['a+1','==','c']

const tokens = [{type: 'mais', value: '+'},{type: 'plus', value: '++'}]

const isIgual = (c, c2) => /=/.test(c) && /[^=]/.test(c2) ? {type: 'igual', value: c} : false;
const isComparacao = (c, c2) => /=/.test(c) && /=/.test(c2) ? {type: 'comparacao', value: c.concat(c2)} : false;

texto.forEach((palavra, index, array)=>{
    
    for(let i = 0; i < palavra.length; i++){
        
    }
    
});

let tamanho = tokens[tokens.length-1].value.length
console.log(tamanho);



