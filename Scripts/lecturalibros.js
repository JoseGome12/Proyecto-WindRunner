const id = localStorage.getItem('id');
alert(id)
fetch("http://localhost:3000/Libros")
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
    readData += `<td><button data-nombre="${itemData.NombreLibro}">Agregar</button></td>`;
    readData += "</tr>";
  });

  document.getElementById('table-reporte').innerHTML = readData;

  // Add listener to the buttons after the table is rendered
  document.querySelectorAll('button[data-nombre]').forEach(btn => {
    btn.addEventListener('click', e => {
      const nombreLibro = e.target.getAttribute('data-nombre');
      alert(`Has agregado el libro: ${nombreLibro}`);
    });
  });
});

const abrirmilibros = document.getElementById('abrirMislibros');

abrirmilibros.addEventListener('click', (event) => {
  event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

  const url = abrirmilibros.getAttribute('href');

  localStorage.setItem('id', id);
  window.open(url, '_blank'); // Abrir en una nueva ventana o pestaña
});
