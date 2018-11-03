
//função que retorna true se c for um operador //Falta adicionar alguns simbolos ao array tokens
const isOperator = c => /[-+*\/^%=()<>,.!{}]/.test(c);
    
//função que retorna true se c for um digito de 0 a 9
const isDigit = c => /[0-9]/.test(c);

//função que retorna true se c for um espaço em branco
const isWhiteSpace = c => /[\s]/.test(c);

//função que retorna algum caralho(vou analisar melhor)
const isString = c => typeof c == "string" && !isOperator(c) && !isWhiteSpace(c) && !isDigit(c); 

//exportar
module.exports = {isOperator, isDigit, isWhiteSpace, isString}
