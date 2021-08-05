var posicionMarcada = "ninguna";

var marcoTablero = document.getElementById('border-tablero');

//Event para ver click casilla
marcoTablero.addEventListener('click', e => { seleccionCelda(e)})
var seleccionCelda = e => {
    if (e.target.classList.contains('ficha-blanca')){         
        if (turnoJugador == 1) {
            if(e.target.classList.contains('select-box') !== true){
                e.target.classList.add("select-box");
                if (posicionMarcada !== "ninguna") {
                    var casillaDesmarca = document.getElementById(posicionMarcada);
                    casillaDesmarca.classList.remove("select-box");
                }
            }
            posicionMarcada = e.target.id;                       
        } else if (turnoJugador == 2) {                          
            window.alert("No es tu turno");
        }

    } else if (e.target.classList.contains('ficha-roja')){  
        if (turnoJugador == 2) {
            if(e.target.classList.contains('select-box') !== true){
                e.target.classList.add("select-box");
                if (posicionMarcada !== "ninguna") {
                    var casillaDesmarca = document.getElementById(posicionMarcada);
                    casillaDesmarca.classList.remove("select-box");
                }
            }
            posicionMarcada = e.target.id;                       
        } else if (turnoJugador == 1) {                          
            window.alert("No es tu turno");
        }
    } else {                                            
        if (posicionMarcada !== "ninguna") {            
            var casillaDesmarca = document.getElementById(posicionMarcada);
            if ( casillaDesmarca.classList.contains('ficha-blanca')  && turnoJugador == 1  && casillaValida('blancas', posicionMarcada, e.target.id)) { 

                e.target.classList.add("ficha-blanca");     
    
                casillaDesmarca.classList.remove("ficha-blanca");  
                casillaDesmarca.classList.remove("select-box"); 
                
                turnoJugador = 2;        
                document.getElementById('turno-jugador').textContent = 'Es el turno del jugador: ' + turnoJugador;
                posicionMarcada = e.target.id;                       
            }
            else if(casillaDesmarca.classList.contains('ficha-roja') 
                    && turnoJugador == 2 
                    && casillaValida('negras', posicionMarcada, e.target.id) ) {
                
                e.target.classList.add("ficha-roja"); 

                casillaDesmarca.classList.remove("ficha-roja");  
                casillaDesmarca.classList.remove("select-box"); 
                
    
                turnoJugador = 1; 
                document.getElementById('turno-jugador').textContent = 'Es el turno del jugador: ' + turnoJugador;
                
                posicionMarcada = e.target.id;                       
            }
        }
    }
}