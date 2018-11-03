//automatos.js modulo que contém as expressões regulares e testes de operadores, string etc. 

//função que retorna true se c for um operador
const isOperator = c => /[-+*\/^%=()<>,.!{}]/.test(c);
    
//função que retorna true se c for um digito de 0 a 9
const isDigit = c => /[0-9]/.test(c);

//função que retorna true se c for um espaço em branco
const isWhiteSpace = c => /[\s]/.test(c);

//função que retorna algum caralho(vou analisar melhor)
const isString = c => typeof c == "string" && !isOperator(c) && !isWhiteSpace(c) && !isDigit(c); 

const qualOperador = (c,c2) => {
     return isMais(c) || isMenos(c) || isVezes(c) || isDivisao(c) || 
     isComparacao(c, c2) || isIgual(c,c2);
}

//ser c for igual a +, retorna o objeto {type: 'mais', value: c} se não false
const isMais = c => /\+/.test(c) ? {type: "mais", value: c} : false;

//ser c for igual a -, retorna o objeto {type: 'menos', value: c}
const isMenos = c => /-/.test(c) ? {type: "menos", value: c} : false;

//idem aos anteriores
const isVezes = c => /\*/.test(c) ? {type: "vezes", value: c} : false;

const isDivisao = c => /\//.test(c) ? {type: "divisao", value: c} : false;

const isComparacao = (c, c2) => /=/.test(c) && /=/.test(c2) ? {type: "comparacao", value: c.concat(c2)} : false;

const isIgual = (c, c2) => /=/.test(c) && /[^=]/.test(c2) ? {type: "igual", value: c} : false;

const isVirgula = c => /,/.test(c) ? {type: "virgula", value: c} : false;



//exportar
module.exports = {isOperator, isDigit, isWhiteSpace, isString, qualOperador}
