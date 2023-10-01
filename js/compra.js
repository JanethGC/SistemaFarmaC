cargarProductos();
cargarProveedores();
CargarCompras();

var array = []
let detalleCompra = []

//Cargar y guardar Proveedores y Productos

function cargarProductos() {

    let select = document.getElementById("selectProducto");

    $.ajax({
        url: "https://localhost:44384/Compra/CargarProducto",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, item) {
                let option = document.createElement("option")
                option.innerHTML = item.descripcion
                option.value = item.codigo

                console.log(item.descripcion + ' value =  ' + item.codigo)

                select.appendChild(option)
            });

        }

    });

}


$(document).on('click', '#selectProducto', function () {
    /*document.getElementById('selectProducto')*/
    let valueOpcion = document.getElementById("selectProducto").value

    /*console.log(valueOpcion)*/

    $.ajax({
        url: "https://localhost:44384/Compra/CargarProducto",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, item) {
                if (item.codigo == valueOpcion) {
                    document.getElementById('codigoProducto').innerHTML = item.codigo

                }
            });

        }

    });

});


$("#btnReset").click(function () {
    //remover todas las opciones excepto la primera
    $("#selectProveedores").find('option').not(':first').remove();
    $("#selectProducto").find('option').not(':first').remove();

    //establecer seleccionado la primera opcion
    $("#selectProveedores").val($("#selectProveedores option:first").val());
    $("#selectProducto").val($("#selectProducto option:first").val());


    cargarProductos();
    cargarProveedores();

})


function cargarProveedores() {

    let select = document.getElementById("selectProveedores");

    $.ajax({
        url: "https://localhost:44384/Compra/CargarProveedor",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, item) {
                let option = document.createElement("option")
                option.innerHTML = item.nombre
                option.value = item.idProveedor

                console.log(item.nombre + ' value =  ' + item.idProveedor)

                select.appendChild(option)
            });

        }

    });


}


$(document).on('click', '#selectProveedores', function () {
    /*document.getElementById('selectProducto')*/
   let proveedorSeleccionado = document.getElementById("selectProveedores").value

    //console.log(proveedorSeleccionado)

    $.ajax({
        url: "https://localhost:44384/Compra/CargarProveedor",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, obj) {
                if (obj.idProveedor == proveedorSeleccionado) {
                    document.getElementById('direccionProveedor').innerHTML = obj.direccion
                    document.getElementById('telefonoProveedor').innerHTML = obj.telefono
                    document.getElementById('correoProveedor').innerHTML = obj.email

                } 
            });

        }

    });

});


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
            url: "https://localhost:44384/Compra/GuardarProveedor",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                document.getElementById("ruc").value = ""
                document.getElementById("nombre").value = ""
                document.getElementById("telefono").value = ""
                document.getElementById("direccion").value = ""
                document.getElementById("email").value = ""
                alert('Proveedor Guardado')

            }
        });

    } else {
        alert('Completa todos los campos')
    }
}


function guardarProducto() {
    var codigo = document.getElementById("codigo").value;
    var descripcion = document.getElementById("descripcion").value;
    var medida = document.getElementById('medida').options[document.getElementById('medida').selectedIndex].text;
   
    var valor = document.getElementById("valor").value;

    if (!codigo == "" & !descripcion == "" & !medida == "" && !valor == "") {
        var req = {
            "codigo": codigo,
            "descripcion": descripcion,
            "medida": medida,
            "valor": valor,
        }

        $.ajax({
            url: "https://localhost:44384/Compra/GuardarProducto",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {

                document.getElementById("codigo").value = ""
                document.getElementById("descripcion").value = ""
                document.getElementById("medida").value = ""
                document.getElementById("valor").value = ""
                alert('Producto Guardado')

            }
        });

    } else {
        alert('Completa todos los campos')
    }
}


// Acciones para el registro de la compra

function agregarItem() {
   
    let codigoProducto = document.getElementById("codigoProducto").innerHTML
    let producto = document.getElementById('selectProducto').options[document.getElementById('selectProducto').selectedIndex].text;
    let cantidad = document.getElementById("cantidad").value
    let precio = document.getElementById("precio").value
    let tipoIVA = document.getElementById('selectIVA').options[document.getElementById('selectIVA').selectedIndex].text;

    if (!codigoProducto == "" & !producto == "" & !cantidad == "" & !precio == "" & !tipoIVA == "") {
        array.push([codigoProducto, producto, cantidad, precio, tipoIVA])

        /*console.log(array)*/

        hacerTabla()

        /* Limpiando opciones */
        document.getElementById("selectIVA").value = ""
        document.getElementById("selectProducto").value = ""
        document.getElementById('codigoProducto').innerHTML = ""
        document.getElementById("cantidad").value = ""
        document.getElementById("precio").value = ""
    } else {
        alert("Datos insuficientes")
    }

    
}


function hacerTabla() {
    let iva12 = 0
    let subtotal12 = 0
    let subtotal0 = 0
    let totalUs=0
    let tabla = `<thead>
   <tr>
   <th></th>
   <th>Codigo producto</th>
   <th>Descripcion</th>
   <th>Cantidad</th>
   <th>Precio unidad</th>
   <th>Tipo IVA</th>
   <th>Subtotal</th>
   </tr>
   </thead>
   <tbody>`

    for (let i = 0; i < array.length; i++) {
        tabla += `<tr>
      <td><button class="btn btn-primary btnborrar" id='${i}'> - </button></td>
      <td id='${i}0'>${array[i][0]}</td>
      <td id='${i}1'>${array[i][1]}</td>
      <td id='${i}2'>${array[i][2]}</td>
      <td id='${i}3'>${array[i][3]}</td>
      <td id='${i}4'>${array[i][4]}</td>
      <td id='${i}5'>${ parseInt(array[i][2]) * parseFloat(array[i][3]).toFixed(2) }</td>
      </tr>`
        //console.log(array[i][4])

        if (array[i][4]== "0") {
            //console.log(" entra a condicion 0%")
            subtotal0 += parseFloat(array[i][2] * array[i][3])
        } else if (array[i][4] == "12") {
            //console.log("entra a condicion 12%")
            subtotal12 += parseInt(array[i][2]) * parseFloat(array[i][3])
            iva12 = Number(parseFloat(subtotal12 * 0.12).toFixed(2))


            console.log("llllll" + typeof subtotal12)
        }
        
        totalUs = parseFloat(subtotal12 + iva12 + subtotal0)
        totalUs.toFixed(2)
    }
    console.log(array)

    tabla += `<tr>
   <td></td>
   <td></td>
   <td></td>
   <td></td>
   <td></td>
   <th>
   <p>SUBTOTAL 12% (+):</p>
   <p>SUBTOTAL 0% (+):</p>
   <p>IVA 12% (+):</p>
   <h3>Total a Pagar:</h3>
   </th>
   <th>
   <p id=subtotal12>${subtotal12}</p>
   <p id=subtotal0>${subtotal0}</p>
   <p id=iva12>${iva12}</p>
   <h3 id=totalUs>${totalUs}</h3>
   </th>
   </tr>
   </tbody>`

    document.getElementById("compras").innerHTML = tabla

}


$(document).on('click', '.btnborrar', function () {
    let index = $(event.target).attr('id');
    array.splice(index, 1)
    console.log(array)
    $(event.target).closest('tr').remove();
    document.getElementById("compras").innerHTML = ""
    hacerTabla();
});


function agregarCompra() {

    let numeroFacturaCC = document.getElementById("num_documento").value;
    let fechaCompraCC = document.getElementById("fecha_compra").value;
    var idProveedorCC = document.getElementById("selectProveedores").value;

    var subTotalCC = document.getElementById("subtotal12").innerHTML;
    var iva0CC = document.getElementById("subtotal0").innerHTML;
    var iva12CC = document.getElementById("iva12").innerHTML;
    var totalCC = document.getElementById("totalUs").innerHTML;

    console.log(fechaCompraCC)

    let cabeceraCompra = [numeroFacturaCC, fechaCompraCC, idProveedorCC, subTotalCC, iva0CC, iva12CC, totalCC]

    let detalleCompra = ""

    for (let m = 0; m < array.length; m++) {
        var codigoProdcutoDC = document.getElementById("" + m + "0").innerHTML;
        var cantidadDC = document.getElementById("" + m + "2").innerHTML;
        var precioDC = document.getElementById("" + m + "3").innerHTML;
        var iva = document.getElementById("" + m + "4").innerHTML;

        console.log(iva)
        let item = codigoProdcutoDC + "/" + cantidadDC + "/" + precioDC+ "/"+iva+ "/$"
        detalleCompra = detalleCompra.concat(item)

    }


    if (!cabeceraCompra=="" && !detalleCompra == "") {
        let datos = {
            "numeroFacturaCC": numeroFacturaCC,
            "fechaCompraCC": fechaCompraCC,
            "idProveedorCC": idProveedorCC,
            "subTotalCC": subTotalCC,
            "iva0CC": iva0CC,
            "iva12CC": iva12CC,
            "totalCC": totalCC,
            "numeroFacturaDC": numeroFacturaCC,
            "codigoProdcutoDC": "",
            "cantidadDC": "",
            "precioDC": "",
            "detalleCompra": detalleCompra
        }

        console.log(datos)

        $.ajax({
            url: "https://localhost:44384/Compra/GuardarCompra",
            type: "POST",
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (datos) {
                //console.log(datos)
                alert("Compra registrada con exito")

                document.getElementById("num_documento").value = ""
                document.getElementById("fecha_compra").value = ""

                document.getElementById("selectProveedores").value = ""
                document.getElementById('direccionProveedor').innerHTML = ""
                document.getElementById('telefonoProveedor').innerHTML = ""
                document.getElementById('correoProveedor').innerHTML = ""

                document.getElementById("selectIVA").value = ""
                document.getElementById("selectProducto").value = ""
                document.getElementById('codigoProducto').innerHTML = ""
                document.getElementById("cantidad").value = ""
                document.getElementById("precio").value = ""


                document.getElementById("compras").innerHTML = ""
                array = []
                console.log(array)

                CargarCompras();

            }
        });

    } else {
        alert('Completa todos los campos')
    }


}


function CargarCompras() {

    $.ajax({
        url: "https://localhost:44384/Compra/CargarCompras",
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
            $tr.append("<td>Opciones</td>");
            $tr.append("<td>Numero de factura</td>");
            $tr.append("<td>Fecha de compra</td>");
            $tr.append("<td>Razon Social</td>");
            $tr.append("<td>Ruc</td>");
            $tr.append("<td>Total de la compra</td>");
            /*      $tr.append("<td></td>");*/

            $cabecera.append($tr);



            $.each(data, function (idx, item) {

                var $tr = $("<tr></tr>");
                //$tr.append("<td>" + <button class="btn btn-primary btnborrar" id='${i}'> Ver detalle </button> + "</td>")


                $tr.append("<td><button  id=" + item.numeroFacturaCC + "  type='button' class='btn btn-primary btnVer' data-bs-toggle='modal' data-bs-target='#CargarCompras'>Ver</button></td>'");
                $tr.append("<td>" + item.numeroFacturaCC + "</td>");
                $tr.append("<td>" + item.fechaCompraCC + "</td>");
              
                $tr.append("<td>" + item.nombreProveedorCC + "</td>");
                $tr.append("<td>" + item.rucProveedorCC + "</td>");
    
                $tr.append("<td>" + item.totalCC + "</td>");
                //$tr.append("<td>" + item.estado + "</td>");
                //$tr.append("<button type='button' class='btn btn-danger'>Elminar</button>");


                $pantalla.append($tr);

            });

            /*console.log(data.clave)*/
        }
    });

}


//Ver detalle de Compra

$(document).on('click', '.btnVer', function () {
    /document.getElementById('selectProducto')/
    let compraSelecionada = $(event.target).attr('id');

    console.log(compraSelecionada)

    let datos = {
        "dato": compraSelecionada
    }

    $.ajax({
        url: "https://localhost:44384/Compra/BuscarCompra",
        type: "POST",
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function (data) {

            let tablaM = `<thead>
                    <tr>
                    <th>N</th>
                    <th>Codigo producto</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio unidad</th>
                    <th>Tipo IVA</th>
                    <th>Subtotal</th>
                    </tr>
                    </thead>`


            //let arrayM = data
            //console.log(arrayM)
            //console.log(data.length)

            $.each(data, function (idx, pro) {

                document.getElementById("numeroFacturaCC").innerHTML = pro.numeroFacturaCC;
                document.getElementById("fechaCompraCC").innerHTML = pro.fechaCompraCC;
                document.getElementById("nombreProveedorCC").innerHTML = pro.nombreProveedorCC;
                document.getElementById("rucProveedorCC").innerHTML = pro.rucProveedorCC;
                document.getElementById('direccionProveedorCC').innerHTML = pro.direccionProveedorCC;
                document.getElementById('telefonoProveedorCC').innerHTML = pro.telefonoProveedorCC;
                document.getElementById('emailProveedorCC').innerHTML = pro.emailProveedorCC;

                let cantidad = pro.cantidadDC;
                let precio = parseFloat(pro.precioDC.replace(",", ".")).toFixed(2);

                let suma = cantidad * precio;

                console.log("pro.cantidadDC: " + typeof cantidad)
                console.log("pro.precioDC: " + typeof precio)
                console.log("suma: " + typeof suma)

                tablaM += `<tr>
                    <td>'${idx + 1}'</td>
                    <td>${pro.codigoProdcutoDC}</td>
                    <td>${pro.descripcion}</td>
                    <td>${pro.cantidadDC}</td>
                    <td>${pro.precioDC}</td>
                    <td>${pro.iva}</td>
                    <td>${suma.toFixed(2)}</td>
                    </tr>`
            });

            tablaM += `<tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

                <th>
                <p>SUBTOTAL 12% (+):</p>
                <p>SUBTOTAL 0% (+):</p>
                <p>IVA 12% (+):</p>
                <h3>Total a Pagar:</h3>
                </th>

                <th>
                <p id=subtotal12>${data[0].subTotalCC}</p>
                <p id=subtotal0>${data[0].iva0CC}</p>
                <p id=iva12>${data[0].iva12CC}</p>
                <h3 id=totalUs>${data[0].totalCC}</h3>
                </th>

                </tr>`

            document.getElementById("comprasM").innerHTML = tablaM
        }
    });
});



//Validaciones de proveedor


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

//function validarCorreo() {
//    var email = document.getElementById("email").value;
//    var expEmail = /^[A-Za-z\._\-0-9][@][A-Za-z][\.][a-z]{2,4}$/;
//    var valido = expEmail.test(email);
//    if (valido == true) {
//    }
//    else {
//        alert("Email invalido");
//        document.getElementById("email").value = '';
//    }

//}

espacios = function (input) {
    if (event.keyCode == 32) {
        input.value = input.value.replace('  ', ' ');//sustituimos dos espacios seguidos por uno 
    }
}




//Validaciones de producto
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

//Tal ves borrar esta validacion porque se filtra el .
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

function soloNumTelefono(e) {
    console.log("e", e)
    key = e.keyCode
    console.log("key", key)
    if (key != 46 && key != 39) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = "0123456789";
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


function digitosPermitidosRuc(e) {
    console.log("e", e)
    key = e.keyCode
    console.log("key", key)
    if (key != 46 ) { //46 es . y 39 es '
        tecla = String.fromCharCode(key).toLowerCase();
        letras = "0123456789";
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
    // Backspace = 8, Enter = 13, ‘0? = 48, ‘9? = 57, ‘.’ = 46, ‘-’ = 43
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


