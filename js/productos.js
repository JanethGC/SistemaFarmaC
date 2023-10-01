listarProducto();

function guardarProducto() {
    var codigo = document.getElementById("codigo").value;
    var descripcion = document.getElementById("descripcion").value;
    var medida = document.getElementById("medida").value;
    var valor = document.getElementById("valor").value;

    if (!codigo == "" & !descripcion == "" & !medida == "" && !valor == "") {
        var req = {
            "codigo": codigo,
            "descripcion": descripcion,
            "medida": medida,
            "valor": valor,
        }

        $.ajax({
            url: "https://localhost:44384/Producto/GuardarProducto",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {

                document.getElementById("codigo").value = ""
                document.getElementById("descripcion").value = ""
                document.getElementById("medida").value = ""
                document.getElementById("valor").value = ""
                alert('Producto Guardados')
                listarProducto()
            }
        });

    } else {
        alert('Completa todos los campos')
    }
}


function modificarProducto() {
    let idProducto = document.getElementById("idd").value;
    let codigo = document.getElementById("codigo").value;
    let descripcion = document.getElementById("descripcion").value;
    let medida = document.getElementById("medida").value;
    let valor = document.getElementById("valor").value;

    if (!codigo == "" && !descripcion == "" && !medida == "" && !valor == "") {
        var req = {
            "idProducto": idProducto,
            "codigo": codigo,
            "descripcion": descripcion,
            "medida": medida,
            "valor": valor
        }

        if (idProducto == "") {
            alert("Primero busque un producto")
        } else {
            $.ajax({
                url: "https://localhost:44384/Producto/ActualizarProducto",
                type: "POST",
                data: JSON.stringify(req),
                contentType: "application/json",
                success: function (data) {
                    console.log(data[0].idProducto)

                    listarProducto()

                    document.getElementById("codigo").value = ""
                    document.getElementById("descripcion").value = ""
                    document.getElementById("medida").value = ""
                    document.getElementById("valor").value = ""


                }
            });

        }
    } else {
        alert("Completa todos los campos")
    }

}


function eliminarProducto() {

    var idProducto = document.getElementById("idd").value;
    var req = { "dato": idProducto }

     if (!idProducto == "") {
         $.ajax({
             url: "https://localhost:44384/Producto/BorrarProducto",
             type: "POST",
             data: JSON.stringify(req),
             contentType: "application/json",
             success: function (data) {
                 console.log(data)
                 listarProducto()

                 document.getElementById("codigo").value = ""
                 document.getElementById("descripcion").value = ""
                 document.getElementById("medida").value = ""
                 document.getElementById("valor").value = ""

             }
         });

    } else {
        alert("Primero busque el producto a Eliminar")
    }
}



function cancelar() {

    document.getElementById("codigo").value = ""
    document.getElementById("descripcion").value = ""
    document.getElementById("medida").value = ""
    document.getElementById("valor").value = ""
}


function buscarProducto() {
    var descripcion = document.getElementById("descripcion").value
    var req = { "dato": descripcion.trim() }

    if (!descripcion == "") {
        $.ajax({
            url: "https://localhost:44384/Producto/BuscarProducto",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                document.getElementById("idd").value = data[0].idProducto
                document.getElementById("codigo").value = data[0].codigo
                document.getElementById("descripcion").value = data[0].descripcion
                document.getElementById("medida").value = data[0].medida
                document.getElementById("valor").value = data[0].valor
            }
        });

    } else {
        alert("Escriba la descripcion del Producto a Buscar")
    }

}


function listarProducto() {

    $.ajax({
        url: "https://localhost:44384/Producto/CargarProducto",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {


            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            $("#cabecera").empty();
            var $cabecera = $("#cabecera");

            var $tr = $("<tr></tr>");
            $tr.append("<td>ID</td>");
            $tr.append("<td>Codigo</td>");
            $tr.append("<td>Descripcion</td>");
            $tr.append("<td>Medida</td>");
            $tr.append("<td>Valor</td>");

            $cabecera.append($tr);


            $.each(data, function (idx, item) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + item.idProducto + "</td>");
                $tr.append("<td>" + item.codigo + "</td>");
                $tr.append("<td>" + item.descripcion + "</td>");
                $tr.append("<td>" + item.medida + "</td>");
                $tr.append("<td>" + item.valor + "</td>");


                $pantalla.append($tr);
                console.log("Listar Producto")


            });

            /console.log(data.clave)/
        }
    });

}

function soloNumLet(e) {
    console.log("e", e)
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = " abcdefghijklmnñopqrstuvwxyz0123456789";
        especiales = [8, 37, 39, 46]; //8 es espacio 37 es tecla derecha 39 es tecla izquierda y 46 es delete

        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial)
            return false;

    } else {
        return false;
    }
}


function numDigPermitidos() {
    var val = document.getElementById("codigo").value;
    var tam = val.length;
    if (tam >= 1 && tam <= 5) {
        alert("Ingrese 6 digitos")
        document.getElementById("codigo").value = '';
        document.getElementById("codigo").focus();
    }
}


function digitosPermitidosMedida(e) {
    console.log("e", e)
    key = e.keyCode
    console.log("key", key)
    if (key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = " abcdefghijklmnñopqrstuvwxyz.0123456789/";
        especiales = [8, 37, 39, 46]; //8 es espacio 37 es tecla derecha 39 es tecla izquierda y 46 es delete

        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (letras.indexOf(tecla) == -1 && !tecla_especial)
            return false;

    } else {
        return false;
    }
}

function digitosPermitidosValor(evt) {
    // Backspace = 8, Enter = 13, ‘0′ = 48, ‘9′ = 57, ‘.’ = 46, ‘-’ = 43
    let input = document.getElementById("valor")
    var key = window.Event ? evt.which : evt.keyCode;
    var chark = String.fromCharCode(key);
    var tempValue = input.value + chark;
    if (key >= 48 && key <= 57) {
        if (filter(tempValue) === false) {
            return false;
        } else {
            return true;
        }
    } else {
        if (key == 8 || key == 13 || key == 0) {
            return true;
        } else if (key == 44) {
            if (filter(tempValue) === false) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}

function filter(__val__) {
    var preg = /^([0-9]+\,?[0-9]{0,2})$/;
    if (preg.test(__val__) === true) {
        return true;
    } else {
        return false;
    }

}
