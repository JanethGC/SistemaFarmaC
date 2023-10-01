listarCliente();



function guardarCliente() {

    var cedula = document.getElementById("cedula").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var direccion = document.getElementById("direccion").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;

    if (!cedula == "" && !nombre == "" && !apellido == "" && !direccion == "" && !telefono == "" && !email == "") {
        var req = {
            "cedula": cedula,
            "nombre": nombre,
            "apellido": apellido,
            "direccion": direccion,
            "telefono": telefono,
            "email": email,
        }

        $.ajax({
            url: "https://localhost:44384/Cliente/GuardarCliente",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log("Cliente guardado");
                listarCliente()
                cancelar()

            }
        });
    } else {
        alert("Completa todos los Campos")
    }
}


function listarCliente() {

    $.ajax({
        url: "https://localhost:44384/Cliente/CargarCliente",
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
            $tr.append("<td>Cedula</td>");
            $tr.append("<td>Nombre</td>");
            $tr.append("<td>Apellido</td>");
            $tr.append("<td>direccion</td>");
            $tr.append("<td>telefono</td>");
            $tr.append("<td>email</td>");
            /*      $tr.append("<td></td>");*/

            $cabecera.append($tr);


            $.each(data, function (idx, item) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + item.idCliente + "</td>");
                $tr.append("<td>" + item.cedula + "</td>");
                $tr.append("<td>" + item.nombre + "</td>");
                $tr.append("<td>" + item.apellido + "</td>");
                $tr.append("<td>" + item.direccion + "</td>");
                $tr.append("<td>" + item.telefono + "</td>");
                $tr.append("<td>" + item.email + "</td>");
                //$tr.append("<td>" + item.estado + "</td>");
                //$tr.append("<button type='button' class='btn btn-danger'>Elminar</button>");


                $pantalla.append($tr);
                console.log("Listar Cliente")


            });

            /*console.log(data.clave)*/
        }
    });

}


function buscarCliente() {
    var cedula = document.getElementById("cedula").value
    var req = { "dato": cedula.trim() }

    if (!cedula == "") {
        $.ajax({
            url: "https://localhost:44384/Cliente/BuscarCliente",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                document.getElementById("idd").value = data[0].idCliente
                document.getElementById("cedula").value = data[0].cedula
                document.getElementById("nombre").value = data[0].nombre
                document.getElementById("apellido").value = data[0].apellido
                document.getElementById("direccion").value = data[0].direccion
                document.getElementById("telefono").value = data[0].telefono
                document.getElementById("email").value = data[0].email
            }
        });

    } else {
        alert("Escriba la cedula del Cliente a Buscar")
    }

}

function modificarCliente() {

    let idCliente = document.getElementById("idd").value;
    let cedula = document.getElementById("cedula").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let direccion = document.getElementById("direccion").value;
    let telefono = document.getElementById("telefono").value;
    let email = document.getElementById("email").value;

    var req = {
        "idCliente": idCliente,
        "cedula": cedula,
        "nombre": nombre,
        "apellido": apellido,
        "direccion": direccion,
        "telefono": telefono,
        "email": email
    }

    if (idCliente == "") {

        alert("Primero busque un cliente")

    } else {
        $.ajax({
            url: "https://localhost:44384/Cliente/ActualizarCliente",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                //console.log(data[0].idCliente)

                listarCliente();

                document.getElementById("idd").value = ""
                document.getElementById("cedula").value = ""
                document.getElementById("nombre").value = ""
                document.getElementById("apellido").value = ""
                document.getElementById("direccion").value = ""
                document.getElementById("telefono").value = ""
                document.getElementById("email").value = ""
            }
        });


    }

}

function eliminarCliente() {
    var idCliente = document.getElementById("idd").value;
    var req = { "dato": idCliente }

    if (!idCliente == "") {

        $.ajax({
            url: "https://localhost:44384/Cliente/BorrarCliente",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                listarCliente();

                document.getElementById("idd").value = ""
                document.getElementById("cedula").value = ""
                document.getElementById("nombre").value = ""
                document.getElementById("apellido").value = ""
                document.getElementById("direccion").value = ""
                document.getElementById("telefono").value = ""
                document.getElementById("email").value = ""
            }
        });

    } else {
        alert("Primero busque el cliente a Eliminar")
    }


}


function eliminarUsuario() {
    var cedula = document.getElementById("cedula").value;
    var idUsuario = document.getElementById("idd").value;
    var req = { "dato": idUsuario }

    if (!cedula == "" && !idUsuario == "") {

    } else {
        alert("Primero busque el Usuario a Eliminar")
    }


}

function siExiste() {
    var cedula = document.getElementById("cedula").value
    var req = { "dato": cedula.trim() }
    $.ajax({
        url: "https://localhost:44384/Cliente/BuscarCliente",
        type: "POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        success: function (data) {
            let respuesta = data[0].cedula
            console.log(respuesta)
            if (!respuesta == "") {
                alert("El usuario ya existe")
            } else {
                guardarCliente();
            }
        }
    });
}

function cancelar() {
    document.getElementById("idd").value = ""
    document.getElementById("cedula").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("direccion").value = ""
    document.getElementById("telefono").value = ""
    document.getElementById("email").value = ""
}

function soloLetras(e) {
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = " abcdefghijklmnñopqrstuvwxyz";
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

function soloNumeros(e) {
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        numeros = "0123456789";
        especiales = [8, 37, 39, 46];

        tecla_especial = false
        for (var i in especiales) {
            if (key == especiales[i]) {
                tecla_especial = true;
                break;
            }
        }

        if (numeros.indexOf(tecla) == -1 && !tecla_especial)
            return false;

    } else {
        return false;
    }
}


function soloDireccion(e) {
    key = e.keyCode
    console.log("key", key)
    if (key != 39) { //46 es . y 39 es '
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

function limpiarCedula() {
    var val = document.getElementById("cedula").value;
    var tam = val.length;
    for (i = 0; i < tam; i++) {
        if (isNaN(val[i]))
            document.getElementById("cedula").value = '';
    }
}



function rangoCedula() {
    var val = document.getElementById("cedula").value;
    var tam = val.length;
    if (tam >= 1 && tam <= 9) {
        alert("Error en el campo cedula ingrese 10 digitos")
        document.getElementById("cedula").value = '';
        document.getElementById("cedula").focus();
    }
}

function rangoTelefono() {
    var val = document.getElementById("telefono").value;
    var tam = val.length;
    if (tam >= 1 && tam <= 9) {
        alert("Error en el campo telefono ingrese 10 digitos")
        document.getElementById("telefono").value = '';
        document.getElementById("telefono").focus();
    }
}

function validarEmail() {
    var email = document.getElementById('email').value;
    var expEmail = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;
    var valido = expEmail.test(email);
    if (valido == true) {
        
    }
    else {
        alert("Email invalido");
        document.getElementById("email").value = '';

    }
}

espacios = function (input) {
    if (event.keyCode == 32) {
        input.value = input.value.replace('  ', ' ');//sustituimos dos espacios seguidos por uno 
    }
}