listarProveedor();




function listarProveedor() {

    $.ajax({
        url: "https://localhost:44384/Proveedor/CargarProveedor",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            console.log(data)

            $("#pantallaP").empty();
            var $pantallaP = $("#pantallaP");

            $("#cabeceraP").empty();
            var $cabeceraP = $("#cabeceraP");

            var $tr = $("<tr></tr>");
            $tr.append("<td>ID</td>");
            $tr.append("<td>RUC</td>");
            $tr.append("<td>Razon Social</td>");
            $tr.append("<td>Telefono</td>");
            $tr.append("<td>Direccion</td>");
            $tr.append("<td>Email</td>");
            /*      $tr.append("<td></td>");*/

            $cabeceraP.append($tr);



            $.each(data, function (idx, item) {

                var $tr = $("<tr></tr>");
                $tr.append("<td>" + item.idProveedor + "</td>");
                $tr.append("<td>" + item.ruc + "</td>");
                $tr.append("<td>" + item.nombre + "</td>");
                $tr.append("<td>" + item.telefono + "</td>");
                $tr.append("<td>" + item.direccion + "</td>");
                $tr.append("<td>" + item.email + "</td>");
                //$tr.append("<td>" + item.estado + "</td>");
                //$tr.append("<button type='button' class='btn btn-danger'>Elminar</button>");


                $pantallaP.append($tr);

            });

            /*console.log(data.clave)*/
        }
    });

}


function guardarProveedor() {
    var ruc = document.getElementById("ruc").value;
    var nombre = document.getElementById("nombre").value;
    var telefono = document.getElementById("telefono").value;
    var direccion = document.getElementById("direccion").value;
    var email = document.getElementById("email").value;

    if (!ruc == "" & !nombre == "" & !telefono == "" && !direccion == "" && !email == "") {
        var req = {
            "ruc": ruc,
            "nombre": nombre,
            "telefono": telefono,
            "direccion": direccion,
            "email": email,
        }

        $.ajax({
            url: "https://localhost:44384/Proveedor/GuardarProveedor",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                document.getElementById("ruc").value = ""
                document.getElementById("nombre").value = ""
                document.getElementById("telefono").value = ""
                document.getElementById("direccion").value = ""
                document.getElementById("email").value = ""
                listarProveedor()

            }
        });

    } else {
        alert('Completa todos los campos')
    }



}


function modificarProveedor() {
    let idProveedor = document.getElementById("idd").value;
    let ruc = document.getElementById("ruc").value;
    let nombre = document.getElementById("nombre").value;
    let telefono = document.getElementById("telefono").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;

    if (!ruc == "" && !nombre == "" && !telefono == "" && !direccion == "" && !email == "") {
        var req = {
            "idProveedor": idProveedor,
            "ruc": ruc,
            "nombre": nombre,
            "telefono": telefono,
            "direccion": direccion,
            "email": email,
        }

        if (idProveedor == "") {
            alert("Primero busque un proveedor")
        } else {
            $.ajax({
                url: "https://localhost:44384/Proveedor/ActualizarProveedor",
                type: "POST",
                data: JSON.stringify(req),
                contentType: "application/json",
                success: function (data) {
                    console.log(data[0].idProveedor)

                    document.getElementById("idd").value = ""
                    document.getElementById("ruc").value = ""
                    document.getElementById("nombre").value = ""
                    document.getElementById("telefono").value = ""
                    document.getElementById("direccion").value = ""
                    document.getElementById("email").value = ""

                    listarProveedor()

                }
            });

        }
    } else {
        alert("Completa todos los campos")
    }



}


function buscarProveedor() {
    let ruc = document.getElementById("ruc").value;
    var req = { "dato": ruc }

    if (!ruc == "") {
        $.ajax({
            url: "https://localhost:44384/Proveedor/BuscarProveedor",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                document.getElementById("idd").value = data[0].idProveedor
                document.getElementById("ruc").value = data[0].ruc
                document.getElementById("nombre").value = data[0].nombre
                document.getElementById("telefono").value = data[0].telefono
                document.getElementById("direccion").value = data[0].direccion
                document.getElementById("email").value = data[0].email
            }
        });
    } else {
        alert("Escribe el RUC del Proveedor a Buscar")
    }



}


function eliminarProveedor() {

    var idProveedor = document.getElementById("idd").value;
    var req = { "dato": idProveedor }
    if (!idProveedor == "") {
        $.ajax({
            url: "https://localhost:44384/Proveedor/BorrarProveedor",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log(data)
                listarProveedor()

                document.getElementById("idd").value = ""
                document.getElementById("ruc").value = ""
                document.getElementById("nombre").value = ""
                document.getElementById("telefono").value = ""
                document.getElementById("direccion").value = ""
                document.getElementById("email").value = ""

            }
        });
    } else {
    
        alert("Primero busque el proveedor a Eliminar")
    }
   
}



function cancelar() {
    document.getElementById("idd").value = ""
    document.getElementById("ruc").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("telefono").value = ""
    document.getElementById("direccion").value = ""
    document.getElementById("email").value = ""
}

function soloLetras(e) {

    console.log("e", e)
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


function soloRazonSocial(e) {

    console.log("e", e)
    key = e.keyCode
    console.log("key", key)
    if (key != 39) { //46 es . y 39 es '
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
}

function rangoRuc() {
    var val = document.getElementById("ruc").value;
    var tam = val.length;
    if (tam >= 1 && tam <= 9) {
        alert("Error en el campo cedula ingrese 10 digitos")
        document.getElementById("ruc").value = '';
    }
}

function limpiarRuc() {
    var val = document.getElementById("ruc").value;
    var tam = val.length;
    for (i = 0; i < tam; i++) {
        if (isNaN(val[i]))
            document.getElementById("ruc").value = '';
    }
}

function validarCorreo() {
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