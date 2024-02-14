const id = localStorage.getItem('id');
const idsoftware = localStorage.getItem('idsoftware');

fetch(`http://localhost:3000/SoftwareID/${idsoftware}`)
.then(res => res.json())
.then(data => {
  let readData = "";
  data.forEach((itemData, index) => {
    var elementoH2 = document.getElementById("software_name");
    elementoH2.innerHTML = itemData.Nombre;
    const nombresoftware = itemData.Nombre;
    var divElement = document.getElementById("descripcionsotware");
    var nuevoParrafo = document.createElement("p");
    nuevoParrafo.classList.add("textosoftware")
    nuevoParrafo.textContent = itemData.Descripcion

    var nuevoh2 = document.createElement("h2")
    nuevoh2.innerHTML = "Nuestro Precio: " + itemData.Precio
    nuevoh2.classList.add("h2precio")

    divElement.appendChild(nuevoParrafo)
    divElement.appendChild(nuevoh2)
    const idsoftware = itemData.IdSoftware
    const precio = itemData.Precio
    var url = "https://localhost:7005/Servicios/TiendasSoftware/" + nombresoftware;
    console.log(url)
    var botonCarrito = document.getElementById("bottoncarrito");
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json",
      success: function (data1) {
          // Verificar si hay datos
          if (data1) {
              // Crear un div para mostrar los datos
              var div = $("<div>").attr("id", "nombre_Tienda");
              console.log(data1);
  
              // Crear un elemento h2 para mostrar los datos
              var h2tiendas = document.createElement("h2");
              h2tiendas.innerHTML = "Tienda: " + data1.nombre_Tienda + " Precio: " + data1.precio;
              h2tiendas.classList.add("h2precioO");
              divElement.append(h2tiendas)
  
              // Agregar el div al body o al elemento que desees
              $("body").append(div);
          } else {
              console.log("No se encontraron datos.");
          }
      },
      error: function (error) {
          console.error("Error al realizar la solicitud AJAX:", error);
      }
  });



    

    botonCarrito.addEventListener("click", function() {
        const apiurl = 'http://localhost:3000/agregarCarrito'; 
        const postData = {
          idUsuario: id,
          idSoftware: idsoftware, 
          Precio: precio   
        };
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        };
        fetch(apiurl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
        alert(`Has agregado el articulo al carrito`);
    });



   });
});