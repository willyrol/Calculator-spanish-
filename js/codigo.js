'use strict';

var d               = document,
    pantalla        = d.getElementById( "pantalla" ),
    teclas          = d.querySelectorAll( ".tecla span" ),
    ultOperacion    = "",
    resultado       = 0,
    principio       = true,
    calc            = true;

function procesador( entrada ) {
    
    var val = pantalla.textContent;
    
    if( entrada == "." && val.indexOf(".") > -1 ) return;
    
    if( entrada == "<" ) {
        
        if( val.length > 1 ) {
            val = val.substring( 0, val.length - 1 );
            pantalla.textContent = val;
        } else {
            
            pantalla.textContent = "0";
            principio   = 1;
            calc        = 1;
            
        }
        
    } else {
        
        if( entrada == "C" ) {
            
            pantalla.textContent = "0";
            resultado   = 0;
            principio   = true;
            calc        = true;
            
        } else {
            
//            console.log( val + entrada );
            
            if( principio ) {
                
                val = "";
                pantalla.textContent = val;
                principio   = false;
                
            }
            
            if( 
                entrada == "+" ||
                entrada == "-" ||
                entrada == "/" ||
                entrada == "X" 
            ) {
                
                principio = true;
                
                if( calc ) {
                    
                    resultado   = val;
                    calc        = false;
                    
                } else {
                    
                    calculador( val );
                    pantalla.textContent = resultado;
                    
                }
                
                ultOperacion = entrada;
                
            } else if( entrada == "raiz" ) {
                
                
                
            } else {
                
                if( entrada == "=" ) {
                    
                    calculador( val );
                    
                    pantalla.textContent = resultado;
                    
                    calc        = true;
                    principio   = true;
                    
                } else {
                    
                    // Ingresa los valores de las teclas
                    // uno al lado del otro
                    pantalla.textContent = val + entrada;
                    
                }
                
            }
            
            
        }
        
    }
    
    
}

function calculador( val ) {
    
    val         = parseFloat( val );
    resultado   = parseFloat( resultado );
    
    switch( ultOperacion ) {
        
        case "+":
            resultado += val;
            break;
        
        case "-":
            resultado -= val;
            break;
        
        case "X":
            resultado *= val;
            break;
        
        case "/":
            resultado /= val;
            break;
        
    }
    
}

window.addEventListener( "keyup", function( e ){
    
    e.preventDefault();
    
    var c = e.which || e.keyCode;

    teclas.forEach( function( e ){
        
        keyCodeClick( e, c );
        
    });

});

function keyCodeClick( elem, keyCode ) {
    
    var entrada     = elem.textContent,
        code        = 0;
    
    if( entrada == "" ) return;
    
    switch( entrada ) {
        
        case "C":
            code = 27;
            break;
        case "<":
            code = 8;
            break;
        case "X":
            code = 106;
            break;
        case "+":
            code = 107;
            break;
        case "/":
            code = 111;
            break;
        case "=":
            code = 13;
            break;
        case "-":
            code = 109;
            break;
        case ".":
            code = 110;
            break;
        default:
            code = entrada.charCodeAt(0);
            break;
            
    }
    
    if( isNumKeyPad( code ) ) {
        
        var numPad  = convertToNumPadKey( code );
        
        if( keyCode == numPad ) {
            elem.click();
        }
        
    }
    
    if( keyCode == code ) {
        elem.click();
        return;
    }
    
    
}

function isNumKeyPad( numKey ) {
    
    if( numKey >= 48 && numKey <= 57 ) return true;
    return false;
    
}

function convertToNumPadKey( numKey ) {
    
    return numKey+48;
    
}

teclas.forEach( function( e ){
    
    e.addEventListener( "click", function(){
        
        var entrada = this.textContent;
        
        if( entrada != "" ) {
            
            procesador( entrada );
            
        }
        
    });
    
});









