const id = localStorage.getItem('id');
$(document).ready(function() {
  // Realizar la solicitud AJAX
  $('#cedulabox').prop('readOnly', true);
  $('#usuariobox').prop('readOnly', true);
  $('#emailbox').prop('readOnly', true);
  $('#numberbox').prop('readOnly', true);
  var activarEdicionCheckbox = $('#activarEdicion');
  $.ajax({
    url: 'http://localhost:3000/verUsuario/'+id,
    type: 'GET',
    dataType: 'json', 
    success: function(data) {
        console.log('Respuesta del servidor:', data);

        $('#cedulabox').val(data[0].cedula);
  
  
        $('#usuariobox').val(data[0].Usuario);
  
  
        $('#emailbox').val(data[0].Correo);

        $('#numberbox').val(data[0].Telefono)
        activarEdicionCheckbox.change(function() {
          var editable = activarEdicionCheckbox.prop('checked');

          if (editable) {
            mostrarBoton();
          } else {
            ocultarBoton();
          }

          $('#cedulabox').prop('readOnly', !editable);
          $('#usuariobox').prop('readOnly', !editable);
          $('#emailbox').prop('readOnly', !editable);
          $('#numberbox').prop('readOnly', !editable);

        })  
    },
    error: function(error) {
        // Manejar errores
        console.error('Error en la solicitud:', error);
    }
  });
  function mostrarBoton() {
    var crearButton = document.getElementById('ModificarButton');
    crearButton.style.display = 'block';
  }
  function ocultarBoton() {
    $('#ModificarButton').hide();
  }
  var modificarButton = $('#ModificarButton');
  modificarButton.click(function() {

    const cedula = $('#cedulabox').val(); 
    const usuario = $('#usuariobox').val();
    const email = $('#emailbox').val();
    const tel = $('#numberbox').val();

    const data = {
      id: id,
      cedula: cedula,
      usuario: usuario,
      correo: email,
      telefono: tel
    };
    $.ajax({
      url: 'http://localhost:3000/Actualizar',
      type: 'PUT',
      contentType: 'application/json',  
      data: JSON.stringify(data),  
      success: function(response) {
          console.log('Solicitud PUT exitosa:', response);
          
      },
      error: function(error) {
          console.error('Error en la solicitud PUT:', error);
          
      }
  });

  }); 

});