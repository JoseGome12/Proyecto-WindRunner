let existeUsuario;
let idUsuario;
let logintry = 3;
let permiso = true;
const abrirOut = localStorage.getItem('outbording');
loginButton.addEventListener('click', () => {
  let usuario = document.getElementById('usuariobox').value;
  let contraseña = document.getElementById('passwordbox').value;
  let url = `http://localhost:3000/verUsuarios/${usuario}/${contraseña}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {

      ({ existe: existeUsuario, idUsuario } = data);

      if (existeUsuario == true && permiso == true) {
        alert("Se ha iniciado sesión");
        localStorage.setItem('id', idUsuario);
        if (abrirOut == 0){
          window.open('Main.html','_self')

        } else if (abrirOut == 1){
          window.open('outbording.html','_self')
        } else {
          window.open('Main.html','_self')

        }

      } if (logintry == 0){
        alert("Te quedaste sin intentos.")
        permiso = false;
      }
      if(existeUsuario == false && permiso == true) {
        logintry = logintry - 1;
        alert('Acceso denegado. Credenciales inválidas. ' + logintry + ' intentos disponibles');


      }
    })
    .catch(error => {
     // logintry = logintry - 1;
      //alert('Acceso denegado. Credenciales inválidas. ' + logintry + ' intentos disponibles');
    });
});
