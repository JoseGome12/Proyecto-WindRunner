const id = localStorage.getItem('id');
fetch(`http://localhost:3000/verTuCarrito/${id}`)
.then(res => res.json())
.then(data => {
  let readData = "";
  let totalPrecio = 0;
  data.forEach((itemData,index) => {
    const divelement = document.createElement('div')
    divelement.classList.add('contenedor_carrito')
    
    const imgElement = document.createElement('img');
    imgElement.src = `img/${index + 1}.jpg`;
    imgElement.classList.add('imgcarrito');
    
    const nombresoftware = document.createElement('h3')
    nombresoftware.innerHTML = itemData.Nombre
    const precio = document.createElement('h3')
    precio.classList.add('textocarrito')
    nombresoftware.classList.add('textocarrito')

    precio.innerHTML = "Precio: " + itemData.Precio

    const containerElement = document.getElementById('container');
    divelement.appendChild(imgElement);
    divelement.appendChild(nombresoftware);
    divelement.appendChild(precio);
    containerElement.appendChild(divelement)
    totalPrecio += parseFloat(itemData.Precio);
    imgElement.addEventListener('click', function (event) {
      url = `http://localhost:3000/EliminarCarrito/${itemData.idCarrito}` 
      fetch(url,{
          method: 'DELETE'
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
    });
  });
  console.log(totalPrecio)
  if (data.length > 0) { // Verifica si hay elementos en la tabla
    const totalh = document.getElementById("totalH");
    totalh.textContent = "Total: " + totalPrecio;
    localStorage.setItem('montoTotal', totalPrecio);
  }

  const botonCarrito = document.getElementById('bottoncarrito');
  botonCarrito.addEventListener('click',e => {
    var comboBox = document.getElementById('combo-box');
    var tipoPago = comboBox.value;
    if (data.length == 0) { // Verifica si hay elementos en la tabla
      alert("El carrito está vacio")
    } else {
      if (tipoPago == "1"){
        window.open('realizarpago.html','_self')
      }
    }

  })



});

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
  alert("Comprar Realizada con exito");

}


