$("#enviartoken").hide();
$("#cambiar").hide();
$("#enviarbutton").click(function() {
    const correo = $("#correobox").val();  
    $.ajax({
        url: 'http://localhost:3000/EnviarToken/'+correo,
        type: "POST", // Método HTTP (GET, POST, PUT, DELETE, etc.)
        dataType: "json", // Tipo de datos esperados (puedes usar "json", "html", "text", etc.)
        success: function(data) {
          console.log("Respuesta exitosa:", data);
          $("#enviartoken").show();
          $("#enviarcorreo").hide();
          $("#mensajee").text(data);
          $("#enviartokenbutton").click(function(){
            console.log("prueba")
            const token = $("#tokenbox").val();
            $.ajax({
              url: 'http://localhost:3000/ComprobarToken/'+correo+"/"+token,
              type: "GET", // Método HTTP (GET, POST, PUT, DELETE, etc.)
              dataType: "json", // Tipo de datos esperados (puedes usar "json", "html", "text", etc.)
              success: function(data) {
                console.log(data)
                if (data.existe == true){
                  alert("Token verificado")
                  $("#enviartoken").hide();
                  $("#cambiar").show();
                  $("#enviarcontraseña").click(function(){
                    const contra = $("#contraseñabox").val();
                    alert(contra);
                    var datos = {
                      correo: correo,
                      contra:contra
                    }
  
                    $.ajax({
                      type: "PUT",
                      url: "http://localhost:3000/CambiarContrasenna", // Reemplaza con la URL a la que deseas enviar los datos
                      data: datos,
                      success: function (respuesta) {
                          // Maneja la respuesta del servidor aquí
                          console.log(respuesta);
                      }
                   });

                  })


                } else if (data.existe == false){
                  alert("Token incorrecto")
                }

              },
              error: function(xhr, status, error) {
                // Manejo de errores
                console.error("Error:", status, error);
              }
            });

          })
        },
        error: function(xhr, status, error) {
          // Manejo de errores
          console.error("Error:", status, error);
        }
      });      
  });