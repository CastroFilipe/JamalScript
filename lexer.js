

module.exports = {
    
    lex : function (input){
        var tokens = []
        var c
        var i = 0

        var isOperator = function(c){
            return /[+\-*\/\^%=()<>,!]/.test(c)
        }
    
        var isDigit = function(c){
            return /[0-9]/.test(c)
        }
    
        var isPontoV = function(c){
            return /;/.test(c)
        }

        var isWhiteSpace = function(c){
            return /[\s]/.test(c)
        }

        var isString = function(c){
            return typeof c == "string" && !isOperator(c) && !isWhiteSpace(c) && !isDigit(c) && !isPontoV(c)
        }

        var advance = function () { 
            return c = input[++i] 
        }

        var getUndefined = function (c){
            idn = c
            operador: do{
                advance()
                if(c === undefined || isWhiteSpace(c)){
                    break operador
                }
                idn += c  
            }while (!isWhiteSpace(c)) 

            return idn
        }

        var addToken = function (type, value) {
            tokens.push({
                type: type,
                value: value
            })
        }

        while (i < input.length) {
            c = input[i];

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
                } else if(idn == "string"){
                    addToken("string", idn)
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
                } else {
                    addToken("identifier", idn)
                }

            } else throw "Unrecognized token."
        
        }
        
        addToken("(end)")   
        return tokens
    },

   
}