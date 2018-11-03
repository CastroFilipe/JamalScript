//automatos.js modulo que contém as expressões regulares e testes de operadores, string etc. 

//função que retorna true se c for um operador
const isOperator = c => /[-+*\/^%=()<>,.!{};]/.test(c);
    
//função que retorna true se c for um digito de 0 a 9
const isDigit = c => /[0-9]/.test(c);

//função que retorna true ou false
const isString = c => typeof c == "string" && !isOperator(c) && !isDigit(c); 

const qualString = (palavra) => {
    return isPalavraReservada(palavra) || isJamalstringText(palavra) || 
    isIdentifier(palavra) || isDesconhecido(palavra)
}

//retorna um objeto com typo e valor do operador. OBS: a ordem em return é importante.
const qualOperador = (c,c2) => {
     return isAdicionar1(c,c2) || isSubtrair1(c,c2) || isMais(c) || isMenos(c) || 
     isVezes(c) || isDivisao(c) || isComparacao(c, c2) || isIgual(c,c2) || 
     isDiferenca(c,c2) || isMenor_Igual(c,c2) || isMaior_Igual(c, c2) || isMaior(c) || 
     isMenor(c) || isAbreParenteses(c) || isFechaParenteses(c) || isAbreChave(c) ||
     isFechaChave(c) || isVirgula(c) || isPonto(c) || isPontoVirgula(c) ||
     isMod(c) || isDesconhecido(c);
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

const isDiferenca = (c, c2) => /!/.test(c) && /=/.test(c2) ? {type: "diferenca", value: c.concat(c2)} : false;

const isAdicionar1 = (c, c2) => /\+/.test(c) && /\+/.test(c2) ? {type: "adiciona1", value: c.concat(c2)} : false;

const isSubtrair1 = (c, c2) => /-/.test(c) && /-/.test(c2) ? {type: "subtrair1", value: c.concat(c2)} : false;

const isMenor_Igual = (c, c2) => /</.test(c) && /=/.test(c2) ? {type: "menor_igual", value: c.concat(c2)} : false;

const isMaior_Igual = (c, c2) => />/.test(c) && /=/.test(c2) ? {type: "maior_igual", value: c.concat(c2)} : false;

const isMenor = c => /</.test(c) ? {type: "menor", value: c} : false;

const isMaior = c => />/.test(c) ? {type: "maior", value: c} : false;

const isAbreParenteses = c => /[(]/.test(c) ? {type: "abre_parenteses", value: c} : false;

const isFechaParenteses = c => /[)]/.test(c) ? {type: "fecha_parenteses", value: c} : false;

const isAbreChave = c => /{/.test(c) ? {type: "abre_chave", value: c} : false;

const isFechaChave = c => /}/.test(c) ? {type: "fecha_chave", value: c} : false;

const isVirgula = c => /,/.test(c) ? {type: "virgula", value: c} : false;

const isPonto = c => /\./.test(c) ? {type: "ponto", value: c} : false;

const isPontoVirgula = c => /;/.test(c) ? {type: "ponto_virgula", value: c} : false;

const isMod = c => /%/.test(c) ? {type: "mod", value: c} : false;

const isAspas = c => /"/.test(c) ? true : false;

//se algum caractere ainda não foi mapeado.
const isDesconhecido = (c) => {
    return  /\W/gi.test(c) ? {type: "Nao_suportado", value: c} : {type: "desconhecido", value: c}
};

//metodos para identificar qual a string:
const isPalavraReservada = (palavra) =>{
    return /^int$/.test(palavra) ? {type: "int", value: palavra} :
    /^jamastring$/i.test(palavra) ? {type: "jamastring", value: palavra} :
    /^float$/i.test(palavra) ? {type: "float", value: palavra} :
    /^bool$/i.test(palavra) ? {type: "bool", value: palavra} : 
    /^func$/i.test(palavra) ? {type: "func", value: palavra} : 
    /^if$/i.test(palavra) ? {type: "if", value: palavra} : 

    /^else$/i.test(palavra) ? {type: "else", value: palavra} : 

    /^for$/i.test(palavra) ? {type: "for", value: palavra} : 

    /^while$/i.test(palavra) ? {type: "while", value: palavra} : 

    /^jamal$/i.test(palavra) ? {type: "jamal", value: palavra} :
    /^print$/i.test(palavra) ? {type: "func_print", value: palavra} :
    /^println$/i.test(palavra) ? {type: "func_println", value: palavra} :
    /^read$/i.test(palavra) ? {type: "func_read", value: palavra} :
    /^readln$/i.test(palavra) ? {type: "func_readln", value: palavra} :
    /^close$/i.test(palavra) ? {type: "func_close", value: palavra} :
    /^pause$/i.test(palavra) ? {type: "func_pause", value: palavra} : false

}

const isJamalstringText = (palavra) =>{
    return /^".*"$/i.test(palavra) ? {type: "jamalstring_text", value: palavra} : false
}

const isIdentifier = (palavra) => !/\W/i.test(palavra) ? {type: "identifier", value: palavra} : false;

//exportar
module.exports = {isOperator, isDigit, isString, qualOperador, isPonto, qualString, isAspas}
