function nuevaPartida() {
    if (window.confirm("Se perderán los datos actuales de la partida, desea continuar?")) {
        nuevoTablero();
        window.alert("A comenzado una nueva partida");
    }
}

//CARGAS INICIALES PARA PARTIDA NUEVA
function nuevoTablero() {
    ArrayInicial = [
        [0,1,0,1,0,1,0,1],
        [1,0,1,0,1,0,1,0],
        [0,1,0,1,0,1,0,1],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [2,0,2,0,2,0,2,0],
        [0,2,0,2,0,2,0,2],
        [2,0,2,0,2,0,2,0],
    ];

    puntosJugador1 = 12;
    puntosJugador2 = 12;

    jugador1 = "";
    jugador2 = "";

    document.getElementById('jugador-nombre1').textContent = "";
    document.getElementById('jugador-nombre2').textContent = "";

    //Turno iniciar
    turnoJugador = 1;

    insert_fichas(ArrayInicial, puntosJugador1, puntosJugador2, turnoJugador, jugador1, jugador2);
}
//FIN CARGA INCIAL PARA PARTIDA NUEVA


function tablero() {
    var tabla   = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < 8; i++) {
        //creo la fila
        var fila = document.createElement("tr");
        for (var j = 0; j < 8; j++) {
            //creo la casilla
            var celda = document.createElement("td");
            celda.id = i + "-" + j;
            indice = i + j;

            //Calculo para definir el color de las casillas
            //Par = negro, impar = blanca
            if (indice%2 == 0) {               
                celda.className = 'casilla-blanca';         
            } else {
                celda.className = 'casilla-negra';   
            }
            fila.appendChild(celda);
        }
        tblBody.appendChild(fila);
    }
    tabla.appendChild(tblBody);
    marcoTablero.appendChild(tabla);
}

//Inserto fichas en el tablero
function insert_fichas(ArrayTablero, puntosJugador1, puntosJugador2, turnoJugador, jugador1, jugador2) {

    document.getElementById('puntos1').value = puntosJugador1;
    document.getElementById('puntos2').value = puntosJugador2;
    document.getElementById('jugador-nombre1').textContent = jugador1;
    document.getElementById('jugador-nombre2').textContent = jugador2;
    //Muestra jugador incial --
    document.getElementById('turno-jugador').textContent = 'Es el turno del jugador: ' + turnoJugador;

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var nombreCelda = i + "-" + j;
            var celda = document.getElementById(nombreCelda);
            celda.id = i + "-" + j;
            indice = i + j;
            
            if ( ArrayTablero[i][j] == 1 ) {
                celda.classList.add("ficha-blanca");                
            }
            else if( ArrayTablero[i][j] == 2 ) {
                celda.classList.add("ficha-roja");
            }
        }   
    }    
}


//Function para validar donde ubicar ficha - (parametros desde app.js)
function casillaValida(colorFichas, posicionAnterior, posicionNueva){
    
    //Varibales de comparacion 
    //Con substrig (0,1) veo cual es la fila anterior - la traigo como ej. 2-5
    var filaAnterior = parseInt(posicionAnterior.substring(0,1));
    //console.log(filaAnterior);
    var columnaAnterior = parseInt(posicionAnterior.substring(2));
    var filaNueva = parseInt(posicionNueva.substring(0,1));
    //Veo el ultimo numero que traigo, en la posicion 2.
    var columnaNueva = parseInt(posicionNueva.substring(2));
    //console.log(columnaNueva);

    

    //verifico segun el color de ficha que toca mover
    //Abs veo el valor de la resta sea el absoluto porque me puede dar negativo
    //Comparacion filanueva == filaanterio+1 corroboro de mover para adelante a la siguiente fila
    if (colorFichas == 'blancas'){       
        if(filaAnterior < 8  && filaNueva == (filaAnterior+1)  && Math.abs(columnaAnterior-columnaNueva) == 1){
            console.log(filaNueva);
            console.log(filaAnterior+1);
            return true;
        }
        else if(filaAnterior < 7  && filaNueva == (filaAnterior+2) && Math.abs(columnaAnterior-columnaNueva) == 2){
            var posicionPosibleFicha = (filaAnterior+1) + "-" + (columnaAnterior + ((columnaNueva-columnaAnterior)/2));
            var casillaVerificar = document.getElementById(posicionPosibleFicha);
            if (casillaVerificar.classList.contains('ficha-roja')){ 
                casillaVerificar.classList.remove("ficha-roja");
                document.getElementById('puntos2').value -= 1;
                if(document.getElementById('puntos2').value == 0){
                    window.alert("GANADORAS: BLANCAS");
                }else{
                    return true;
                }
            }
        }
    }   
    else if (colorFichas == 'negras') {
        if(filaAnterior > 1  && filaNueva == (filaAnterior-1)  && Math.abs(columnaAnterior-columnaNueva) == 1){
            return true;
        }
        else if(filaAnterior > 2 
            && filaNueva == (filaAnterior-2)  && Math.abs(columnaAnterior-columnaNueva) == 2){
            var posicionPosibleFicha = (filaAnterior-1) + "-" + (columnaAnterior + ((columnaNueva-columnaAnterior)/2));
            var casillaVerificar = document.getElementById(posicionPosibleFicha);
            if (casillaVerificar.classList.contains('ficha-blanca')){ 
                casillaVerificar.classList.remove("ficha-blanca");
                document.getElementById('puntos1').value -= 1;
                if(document.getElementById('puntos1').value == 0){
                    window.alert("GANADORAS: ROJAS");
                }else{
                    return true;
                }
            }
        }
    }
    return false;
}

function guardar_partida() {

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            var nombreCelda = i + "-" + j;
            var celda = document.getElementById(nombreCelda);
            if ( celda.classList.contains('ficha-blanca') ) {               
                ArrayInicial[i][j] = 1;     
            } 
            else if ( celda.classList.contains('ficha-roja') ) {
                ArrayInicial[i][j] = 2;     
            }
            else {
                ArrayInicial[i][j] = 0;       
            }
        }   
    }  
    var ArrayInicialString = JSON.stringify(ArrayInicial);
    //Guardo en local storage
    localStorage.setItem("Partida1.Puntos1", document.getElementById('puntos1').value);
    localStorage.setItem("Partida1.Puntos2", document.getElementById('puntos2').value);
    localStorage.setItem("Partida1.Jugador1",document.getElementById('jugador-nombre1').textContent);
    localStorage.setItem("Partida1.Jugador2",document.getElementById('jugador-nombre2').textContent);
    localStorage.setItem("Partida1.Juego", ArrayInicialString);
    localStorage.setItem("Partida1.TurnoJugador", turnoJugador);
    window.alert("Partida guardada");

}

function recuperar_partida_guardada() {
    if (window.confirm("Desea cargar la partida?")) {
        var puntosJugador1 = localStorage.getItem("Partida1.Puntos1");
        var puntosJugador2 = localStorage.getItem("Partida1.Puntos2");
        var ArrayInicial =  JSON.parse(localStorage.getItem("Partida1.Juego"));
        var turnoJugador = localStorage.getItem("Partida1.TurnoJugador");
        var jugador1 = localStorage.getItem("Partida1.Jugador1")
        var jugador2 = localStorage.getItem("Partida1.Jugador2")
        insert_fichas(ArrayInicial, puntosJugador1, puntosJugador2, turnoJugador, jugador1, jugador2);
    }
}

function guardarJugadores(){
    var nombre1 = document.getElementById('name-1').value;
    var nombre2 = document.getElementById('name-2').value;

    document.getElementById('jugador-nombre1').textContent = nombre1;
    document.getElementById('jugador-nombre2').textContent = nombre2;

}






