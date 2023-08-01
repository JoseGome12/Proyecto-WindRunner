let existeUsuario;
let idUsuario;

loginButton.addEventListener('click', () => {
  const usuario = document.getElementById('usuariobox').value;
  const contraseña = document.getElementById('passwordbox').value;
  const url = `http://localhost:3000/verUsuarios/${usuario}/${contraseña}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      // Desestructuración para extraer las propiedades del objeto data y asignarlas a variables
      ({ existe: existeUsuario, idUsuario } = data);

      if (existeUsuario == true) {
        alert("Se ha iniciado sesión");
        localStorage.setItem('id', idUsuario);
        window.open('Main.html')

      } else {
        alert('Acceso denegado. Credenciales inválidas.');
      }
    })
    .catch(error => {
      console.error('Error al realizar la solicitud:', error);
      alert('Error al realizar la solicitud a la API');
    });
});
