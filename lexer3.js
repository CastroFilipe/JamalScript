//não está mais em uso. vai ser excluido depois 
//falta implementar algumas coisas daqui no outro lex.
module.exports = {
    
    lex : function (inputString){

        
        let tokens = []
        let c
        let i = 0


        //funcao advanced. Quero remover essa funcao pois usaremos alguma funcao presente em Array para percorrer.
        const advance = () => c = inputString[++i]; 

        const addToken = function (type, value) {
            //esse if vai sair quando usarmos o arrayPalavras pois não exixtirá a..
            //..possibilidade do array palavras conter alguma string vazia.
            if(value == ""){
                return
            }
            //adiciona um objeto na ultima posicao do array tokens.
            tokens.push({
                type: type,
                value: value
            })
        }

        while (i < inputString.length) {
            c = inputString[i];

            if (isWhiteSpace(c)){ //vai sair tudo isso.
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


                //vai ficar, mas será mudado para expressoes regulares e colocado em outro arquivo.
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