

module.exports = {
    
    lex : function (inputString){

        /*as duas linhas abaixo removem todos os espacos em branco contidos na 
         * string inputString.
         * Ex. 
         * inputString = ' a     casa é b onita '
         * ao final, teremos em arrayPalavras : ['a', 'casa', 'é', 'b', 'onita']
         * um array livre de espaços e apenas com as palavras
         * assim, a comparação isWhitSpace será desnecessária
         */
        const arrayAux = inputString.split(/\s+/g);
        const arrayPalavras = arrayAux.filter(word => word.length > 0);
        //console.log(arrayPalavras);//teste
        
        var tokens = []
        var c
        var i = 0

        //função que retorna true se c for um operador //Falta consertar a Expressão regular
        const isOperator = c => /[-+*\/^%=()<>,.!{}]/.test(c);
    
        //função que retorna true se c for um digito de 0 a 9
        const isDigit = c => /[0-9]/.test(c);
        
        //função que retorna true se c for um espaço em branco
        const isWhiteSpace = c => /[\s]/.test(c);

        //função que retorna algum caralho(vou analisar melhor)
        const isString = c => typeof c == "string" && !isOperator(c) && !isWhiteSpace(c) && !isDigit(c); 

        const advance = () => c = inputString[++i]; 

        const addToken = function (type, value) {
            if(value == ""){
                return
            }
            tokens.push({
                type: type,
                value: value
            })
        }

        while (i < inputString.length) {
            c = inputString[i];

            if (isWhiteSpace(c)){
                advance()
            } else if (isOperator(c)) {
                idn = c
                operador: do{
                    advance()
                    if(c === undefined || isWhiteSpace(c)){
                        break operador
                    }
                    idn += c  
                }while (!isWhiteSpace(c)) 


                if(idn == "+"){ 
                    addToken("mais",idn)
                    advance()
                } else if(idn == "-"){ 
                    addToken("menos",idn)
                    advance()
                } else if(idn == "*"){ 
                    addToken("vezes",idn)
                    advance()
                } else if(idn == "/"){ 
                    addToken("divisao",idn)
                    advance()
                } else if(idn == "=="){ 
                    addToken("comparacao",idn)
                    advance()
                } else if(idn == "!="){ 
                    addToken("diferenca",idn)
                    advance()
                } else if(idn == "="){ 
                    addToken("igual",idn)
                    advance()
                } else if(idn == "++"){ 
                    addToken("adicionar1",idn)
                    advance()
                } else if(idn == "--"){ 
                    addToken("subtrair1",idn)
                    advance()
                } else if(idn == "<"){ 
                    addToken("menor",idn)
                    advance()
                } else if(idn == ">"){ 
                    addToken("maior",idn)
                    advance()
                } else if(idn == "<="){ 
                    addToken("menor_igual",idn)
                    advance()
                } else if(idn == ">="){ 
                    addToken("maior_igual",idn)
                    advance()
                } else if(idn == "("){ 
                    addToken("abre_parent",idn)
                    advance()
                } else if(idn == ")"){ 
                    addToken("fecha_parent",idn)
                    advance()
                } else if(idn == "{"){ 
                    addToken("abre_chave",idn)
                    advance()
                } else if(idn == "}"){ 
                    addToken("fecha_chave",idn)
                    advance()
                } else {
                    advance()
                }
                
            }  else if (isDigit(c)) {
                var num = c

                while (isDigit(advance())){
                    num += c  
                } 

                if (c === ".") {

                    do {
                        num += c
                    } while (isDigit(advance()))

                }

                num = parseFloat(num)
                if (!isFinite(num)) throw "Number is too large or too small for a 64-bit double."
                addToken("number", num)

            } else if (isString(c)) {
                idn = c
                outerloop: do{
                    advance()
                    if(c === undefined || isWhiteSpace(c)){
                        break outerloop
                    }
                    idn += c  
                }while (!isWhiteSpace(c) || !isOperator(c))       

                if(idn == "int"){ 
                    addToken("integer", idn)
                } else if(idn == "jamastring"){
                    addToken("jamastring", idn)
                } else if(idn == "float"){
                    addToken("float", idn)
                } else if(idn == "bool"){
                    addToken("bool", idn)
                } else if(idn == "func"){
                    addToken("funcao", idn)
                } else if(idn == "if"){
                    addToken("if", idn)
                } else if(idn == "else"){
                    addToken("else", idn)
                } else if(idn == "for"){
                    addToken("for", idn)
                } else if(idn == "while"){
                    addToken("while", idn)
                } else if(idn == "jamal"){
                    addToken("jamal", idn)
                } else if(idn == "print"){
                    addToken("print", idn)
                } else if(idn == "println"){
                    addToken("println", idn)
                } else if(idn == "read"){
                    addToken("read", idn)
                } else if(idn == "readln"){
                    addToken("readln", idn)
                } else if(idn == "close"){
                    addToken("fechar", idn)
                } else if(idn == "pause"){
                    addToken("pausar", idn)
                } else if(idn.charAt(0) == "\""){
                    idn = idn.replace(/"/g, "")
                    addToken("jamastring_text", idn)
                } else {
                    addToken("identifier", idn)
                }

            } else throw "Unrecognized token."
        
        }
        
        addToken("(end)")   
        return tokens
    },

   
}