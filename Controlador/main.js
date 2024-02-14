const id = localStorage.getItem('id');
fetch(`http://localhost:3000/Software`)
.then(res => res.json())
.then(data => {
  let readData = "";

  data.forEach((itemData, index) => {
    const labelElement = document.createElement('label');
    labelElement.textContent = itemData.Nombre;
    labelElement.classList.add('productos');

    const imgElement = document.createElement('img');
    imgElement.src = `img/${index + 1}.jpg`;
    imgElement.alt = itemData.nombre;
    imgElement.classList.add('imgp');

    let primerToque = 0;
    let segundoToque = 0;
    const umbralDeTiempo = 300;
    imgElement.addEventListener('touchstart', function (event) {
      if (primerToque === 0) {
        primerToque = new Date().getTime();
      } else {
        segundoToque = new Date().getTime();

        if (segundoToque - primerToque <= umbralDeTiempo) {
          localStorage.setItem('idsoftware', itemData.IdSoftware);
          window.open('producto.html','_self')
        }
        
        primerToque = 0;
        segundoToque = 0;
      }
    });

    const containerElement = document.getElementById('container');
    containerElement.appendChild(imgElement);
    containerElement.appendChild(labelElement);

  });
});