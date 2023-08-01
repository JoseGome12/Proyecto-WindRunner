const id = localStorage.getItem('id');
alert(id)
fetch(`http://localhost:3000/verTusLibros/${id}`)
.then(res => res.json())
.then(data => {
  let readData = "";

  data.forEach((itemData) => {
    readData += "<tr>";
    readData += `<td><img src="portadas/${itemData.idLibro}.jpg"></td>`;
    readData += "<td>" + itemData.NombreLibro + "</td>";
    readData += "<td>" + itemData.Autor + "</td>";
    readData += "<td>" + itemData.Genero + "</td>";
    readData += "<td>" + itemData.FechaPublicacion + "</td>";
    readData += `<td><button data-nombre="${itemData.NombreLibro}">Eliminar</button></td>`;
    readData += "</tr>";
  });

  document.getElementById('table-reporte').innerHTML = readData;

});