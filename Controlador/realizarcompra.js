const id = localStorage.getItem('id');
const montoTotal = localStorage.getItem('montoTotal');
document.getElementById('pagarButton').addEventListener('click', function() {
    const nombre = document.getElementById('nombrebox').value;
    const numeroTarjeta = document.getElementById('tarjetabox').value;
    const pin = document.getElementById('pinbox').value;
    const fecha = document.getElementById('fechabox').value;
    var datos = {
        Nombre: nombre,
        Numero_Tarjeta: numeroTarjeta,
        Pin: pin,
        Fecha: fecha,
        Monto: montoTotal
      };
      if (montoTotal == 0){
        alert('Carrito vacio')
      } else {
        $.ajax({
            type: 'POST',
            url: 'https://localhost:7005/Servicios/BancoCentral',
            contentType: 'application/json',
            data: JSON.stringify(datos),
            success: function(response) {
              if (response == "No hay fondos suficientes")
              {
                alert(response)
              } else {
                console.log('Éxito:', response);
                alert('Pago realizado con éxito');
                limpiarCampos();
                localStorage.setItem('montoTotal', 0);
                realizarCompra();

              }

            },
            error: function(error) {
              console.error('Error:', error);
              alert('Campos vacios');
            }
          });
      }
     
  });
function limpiarCampos() {
    // Establecer en blanco los valores de los campos de entrada
    document.getElementById('nombrebox').value = '';
    document.getElementById('tarjetabox').value = '';
    document.getElementById('pinbox').value = '';
    document.getElementById('fechabox').value = '';
 }
 function realizarCompra(){
  url = `http://localhost:3000/HacerComprar/${id}` 
  fetch(url,{
      method: 'PUT'
  })
  .then(response => {

      return response.text(); 
    })
    .then(data => {

      console.log(data); 
      location.reload()
    })
    .catch(error => {
      console.error(`Error en la solicitud: ${error.message}`);
  });

}