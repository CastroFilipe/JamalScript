

module.exports = {
    
    lex : function (input){
        var tokens = []
        var c
        var i = 0

        var isOperator = function(c){
            return /[+\-*\/\^%=(),]/.test(c)
        }
    
        var isDigit = function(c){
            return /[0-9]/.test(c)
        }
    
        var isWhiteSpace = function(c){
            return /[\s]/.test(c)
        }

        var isString = function(c){
            return typeof c == "string" && !isOperator(c) && !isWhiteSpace(c) && !isDigit(c)
        }

        var advance = function () { 
            return c = input[++i] 
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
                if(c == "+"){ 
                    addToken("mais",c)
                    advance()
                } else if(c == "-"){ 
                    addToken("menos",c)
                    advance()
                } else if(c == "*"){ 
                    addToken("vezes",c)
                    advance()
                } else if(c == "/"){ 
                    addToken("divisao",c)
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
                var idn = c

                while (!isWhiteSpace(advance()) || !isOperator(advance())){
                    idn += c
                    if(input.substring(input.length -1) == c){
                        c == " "
                        break;
                    }
                }

                if(idn == "int"){ 
                    addToken("integer", idn)
                } else if(idn == "string"){
                    addToken("string", idn)
                } else if(idn == "float"){
                    addToken("float", idn)
                } else if(idn == "bool"){
                    addToken("bool", idn)
                } else {
                    addToken("identifier", idn)
                }

            } else throw "Unrecognized token."
        
        }
        
        addToken("(end)")   
        return tokens
    },

   
}