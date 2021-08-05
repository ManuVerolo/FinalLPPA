function enviarMail() {
    nombre = document.getElementById('name').value;
    email = document.getElementById('email').value;
    mensaje = document.getElementById('message').value;
    
    validar(nombre, email, mensaje);
    
    window.location.href = 'mailto:damas@damas.com?subject=The subject - ' + nombre + ' (' + email + ')' + '&body=' + mensaje;
};

function validar(nombre, email, mensaje){
    if(mensaje.length < 5 ){
        window.alert('El mensaje debe tener mas de 5 caracteres');
    }
}