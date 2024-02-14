var $select = $("#selectubicacion");
var $selectcanton = $('#cantonselect');
var $selectdistrito = $('#distritoselect');

cargarProvincias();

$select.on("change", function () {
    var provinciaSeleccionada = $select.val();

    if (provinciaSeleccionada) {
        cargarCantones(provinciaSeleccionada);

        $selectcanton.on("change", function () {
            var Cantonseleccionada = $selectcanton.val();
            if (Cantonseleccionada) {
                cargarDistrito(Cantonseleccionada);
            }
        });
    } else {
        // Si no se selecciona ninguna provincia, vacía el select de cantones
        $selectcanton.empty();
    }
});

const CrearButton = document.getElementById('CrearButton');
CrearButton.addEventListener('click', () => {
    localStorage.setItem('outbording', 1)
    const cedula = document.getElementById('cedulabox').value;
    const usuario = document.getElementById('usuariobox').value;
    const contraseña = document.getElementById('passwordbox').value;
    const correo = document.getElementById('emailbox').value;
    const tel = document.getElementById('numberbox').value;
    const select1 = document.getElementById('selectubicacion');
    const select2 = document.getElementById('cantonselect');
    const select3 = document.getElementById('distritoselect');
    const valorSeleccionado1 = select1.text;
    const valorSeleccionado2 = select2.text;
    const valorSeleccionado3 = select3.text;
    const valoresConcatenados = valorSeleccionado1 + '.' + valorSeleccionado2 + '.' + valorSeleccionado3;

    // Verificar si la contraseña cumple con los requisitos
    if (!isValidPassword(contraseña)) {
        alert('La contraseña no cumple con los requisitos.');
        return;
    }

    $.ajax({
        type: "GET",
        url: "https://localhost:7005/Servicios/MinisterioHacienda/" + cedula,
        success: function (data) {
            if (data === false) {
                alert("La cédula no es válida. No se realizará el registro.");
            } else {
                const url = 'http://localhost:3000/NuevoUsuario';
                const data = {
                    cedula: cedula,
                    usuario: usuario,
                    contraseña: contraseña,
                    Correo: correo,
                    Telefono: tel,
                    Ubicacion: valoresConcatenados
                };
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
                fetch(url, requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('La solicitud no se completó correctamente.');
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Manejar la respuesta de la API
                        alert("Usuario creado con éxito");
                        usuario.value = "";
                        contraseña.value = "";
                        correo.value = "";
                        tel.value = "";
                        ubicacion.value = "";
                    })
                    .catch(error => {
                        // Manejar errores
                        console.error('Error al enviar la solicitud:', error);
                    });
            }
        },
        error: function (error) {
            console.error("Error en la solicitud: ", error);
        }
    });
});

function isValidPassword(password) {
    if (password.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if (/(012|123|234|345|456|567|678|789)/.test(password)) {
        return false;
    }

    if (!/[\W_]/.test(password)) {
        return false;
    }

    return true;
}

function cargarProvincias() {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/GetProvincia",
        success: function (data) {
            $select.empty();
            $.each(data, function (index, item) {
                $select.append($('<option>', {
                    value: item.id,
                    text: item.Nombre
                }));
            });
        }
    });
}

function cargarCantones(provincia) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/GetCanton/" + provincia,
        success: function (data1) {
            $selectcanton.empty();
            $.each(data1, function (index, item) {
                $selectcanton.append($('<option>', {
                    value: item.id,
                    text: item.Nombre
                }));
            });
        }
    });
}

function cargarDistrito(canton) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/GetDistrito/" + canton,
        success: function (data1) {
            $selectdistrito.empty();
            $.each(data1, function (index, item) {
                $selectdistrito.append($('<option>', {
                    value: item.id,
                    text: item.Nombre
                }));
            });
        }
    });
}