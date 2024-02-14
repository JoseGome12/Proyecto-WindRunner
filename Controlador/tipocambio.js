$(document).ready(function() {
    // Realizar la solicitud AJAX
    $.ajax({
        url: 'https://tipodecambio.paginasweb.cr/api',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#compra').text( data.compra);
            $('#venta').text(data.venta);
        },
        error: function(error) {
            console.error('Error en la solicitud AJAX:', error);
        }
    });
});