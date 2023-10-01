listarUsuario();


function listarUsuario() {

    $.ajax({
        url: "https://localhost:44384/Usuario/CargarUsuarios",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {

            console.log(data);

            $("#pantalla").empty();
            var $pantalla = $("#pantalla");

            $("#cabecera").empty();
            var $cabecera = $("#cabecera");

            var $tr = $("<tr></tr>");
            $tr.append("<td>ID</td>");
            $tr.append("<td>Nombre</td>");
            $tr.append("<td>Apellido</td>");
            $tr.append("<td>Rol</td>");
            $tr.append("<td>Contraseña</td>");
            $tr.append("<td>Cedula</td>");
            /*      $tr.append("<td></td>");*/

            $cabecera.append($tr);



            $.each(data, function (idx, item) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + item.idUsuario + "</td>");
                $tr.append("<td>" + item.nombre + "</td>");
                $tr.append("<td>" + item.apellido + "</td>");
                $tr.append("<td>" + item.rol + "</td>");
                $tr.append("<td>" + item.contraseña + "</td>");
                $tr.append("<td>" + item.cedula + "</td>");
                //$tr.append("<td>" + item.estado + "</td>");
                //$tr.append("<button type='button' class='btn btn-danger'>Elminar</button>");


                $pantalla.append($tr);

            });

            /*console.log(data.clave)*/
        }
    });

}


function guardarUsuario() {
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var rol = document.getElementById("rol").value;
    var clave = document.getElementById("clave").value;
    var cedula = document.getElementById("cedula").value;

    if (!nombre == "" && !apellido == "" && !rol == "" && !clave == "" && !cedula == "" && rol !== "Seleccione una opcion") {
        var req = {
            "nombre": nombre,
            "apellido": apellido,
            "rol": rol,
            "contraseña": clave,
            "cedula": cedula,
        }

        $.ajax({
            url: "https://localhost:44384/Usuario/GuardarUsuario",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                cancelar();
                alert("Usuario Guardado")
                listarUsuario();
            }
        });

    } else {
        alert("Complete todos los campos")
    }



}


function modificarUsuario() {
    let idUsuario = document.getElementById("idd").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let rol = document.getElementById("rol").value;
    let clave = document.getElementById("clave").value;
    let cedula = document.getElementById("cedula").value;

    if (!nombre == "" && !apellido == "" && !rol == "" && !clave == "" && !cedula == "") {
        var req = {
            "idUsuario": idUsuario,
            "nombre": nombre,
            "apellido": apellido,
            "rol": rol,
            "contraseña": clave,
            "cedula": cedula,
        }

        if (idUsuario == "") {
            alert("Primero busque el usuario a modificar")
        } else {
            $.ajax({
                url: "https://localhost:44384/Usuario/ActualizarUsuario",
                type: "POST",
                data: JSON.stringify(req),
                contentType: "application/json",
                success: function (data) {
                    console.log(data[0].idUsuario)
                    cancelar();
                    alert("Cambios guardados")
                    listarUsuario();



                }
            });
        }
    } else {
        alert("Primero busque el Usuario")
    }

}


function buscarUsuario() {

    var cedula = document.getElementById("cedula").value;
    var req = { "dato": cedula }

    if (!cedula == "") {
        $.ajax({
            url: "https://localhost:44384/Usuario/BuscarUsuario",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                document.getElementById("idd").value = data[0].idUsuario
                document.getElementById("nombre").value = data[0].nombre
                document.getElementById("apellido").value = data[0].apellido
                document.getElementById("rol").value = data[0].rol
                document.getElementById("clave").value = data[0].contraseña
                document.getElementById("cedula").value = data[0].cedula
            }
        });
    } else {
        alert("Escriba la cedula del usuario")
    }



}


function eliminarUsuario() {
    var cedula = document.getElementById("cedula").value;
    var idUsuario = document.getElementById("idd").value;
    var req = { "dato": idUsuario }

    if (!cedula == "" && !idUsuario == "") {
        $.ajax({
            url: "https://localhost:44384/Usuario/BorrarUsuario",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log(data)

                cancelar();
                alert("Usuario Eliminado")
                listarUsuario();


            }
        });
    } else {
        alert("Primero busque el Usuario a Eliminar")
    }


}

function siExiste() {
    var cedula = document.getElementById("cedula").value
    var req = { "dato": cedula.trim() }
    $.ajax({
        url: "https://localhost:44384/Usuario/BuscarUsuario",
        type: "POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        success: function (data) {
            let respuesta = data[0].cedula
            console.log(respuesta)
            if (!respuesta == "") {
                alert("El usuario ya existe")
            } else {
                guardarUsuario();
            }
        }
    });
}

function cancelar() {
    document.getElementById("idd").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("apellido").value = ""
    document.getElementById("rol").value = "Seleccione una opcion"
    document.getElementById("clave").value = ""
    document.getElementById("cedula").value = ""
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

function soloNumLetras(e) {
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = "abcdefghijklmnñopqrstuvwxyz0123456789";
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

espacios = function (input) {
    if (event.keyCode == 32) {
        input.value = input.value.replace('  ', ' ');//sustituimos dos espacios seguidos por uno 
    }
}