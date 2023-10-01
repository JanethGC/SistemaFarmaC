cargarClientes();
cargarProductos();
cargarVendedor();
datosDefault();
CargarFacturas();

let datos = []
let array = []
var idCliente = ''
var conjunto=[]

function horaActual() {
    var currentTime = new Date();

    let hrs = currentTime.getHours();
    let min = currentTime.getMinutes();
    let sec = currentTime.getSeconds();

    let horaActual = hrs + ':' + min + ':' + sec
    return horaActual
}

function calcularTotal() {
    document.getElementById('cantidad').innerHTML = ''

    let total= 0
    if (!document.getElementById('codigo').innerHTML == '') {
        let cantidad = document.getElementById("cantidad").value;
        let precioU = document.getElementById("valor").innerHTML;
        let iva = document.getElementById("iva").innerHTML;

        let baseImponible = cantidad * precioU

        if (iva == '12') {
            total = baseImponible * 1.12
            document.getElementById('total').innerHTML=total.toFixed(2)
        } else {
            total = baseImponible
            document.getElementById('total').innerHTML = total.toFixed(2)

        }
        console.log('cantidad= '+cantitad + ' precio=  ' + precioU + ' iva= ' + iva)


    }

    
}


cantidad.oninput = function () {
    let cantidadT=0
    let total = 0
    cantidadT = cantidad.value
    if (!document.getElementById('codigo').innerHTML == '' && !cantidadT == '') {

        let stock = document.getElementById("stock").innerHTML
        if (parseInt(cantidadT) > stock) {
            console.log('Tipo de dato: ' + typeof cantidadT)
            console.log('has digitado el: ' + cantidadT +'> '+ stock+ ' ?')
            alert('Fuera de STOCK')
            cantidad.value = ''
        } else {
            let precioU = document.getElementById("valor").innerHTML;
            let iva = document.getElementById("iva").innerHTML;

            let baseImponible = cantidadT * precioU

            if (iva == '12') {
                total = baseImponible * 1.12
                totalP.innerHTML = total.toFixed(2)
            } else {
                total = baseImponible
                totalP.innerHTML = total.toFixed(2)

            }
        //    console.log(total + '  ' + precioU + '  ' + iva)
        }
        


    }

//    total.innerHTML = input.value;
};

function datosDefault() {
  
    let date = new Date().toLocaleDateString();
    document.getElementById('fechaEmision').innerHTML = date
    let numFacDispo = ''
    let numFactura = 0
    conjunto = []
    let max = 0


    $.ajax({
        url: "https://localhost:44384/Factura/CargarFacturas",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            console.log(data.length+ ' data.lenght')
            if (data.length == 0) {
                document.getElementById('codigoFactura').innerHTML = '0000000001'

            } else {
                $.each(data, function (idx, item) {
                    console.log(item.codigoFacturaCF)

                    let ultimoNumFactura = parseInt(item.codigoFacturaCF)

                    conjunto.push(ultimoNumFactura)

                    max = conjunto.reduce(function (a, b) {
                        return Math.max(a, b);
                    }, -Infinity);


                });
                console.log(max + ' maximo')

                numFactura = max + 1

                let numDigNFD = countTotalDigits(numFacDispo)
                let numDigUNF = countTotalDigits(numFactura)

                for (let i = 0; i < 10 - numDigUNF; i++) {
                    let addCero = '0'
                    numFacDispo = numFacDispo.concat(addCero)
                    console.log(numFacDispo)

                }
                let numeroDocumento = numFacDispo.concat(numFactura)
                document.getElementById('codigoFactura').innerHTML = numeroDocumento
            }

           


        }

    });
}


function countTotalDigits(num) {
    var result = 0;
    while (num != 0) {
        num = Math.floor(num / 10);
        ++result;
    }
    return result;
}



// Cargar los productos y clientes

function cargarProductos() {

    let select = document.getElementById("selectProducto");

    $.ajax({
        url: "https://localhost:44384/Factura/CargarProducto",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, item) {
                let option = document.createElement("option")
                option.innerHTML = item.descripcion
                option.value = item.codigo

                //console.log(item.descripcion + ' value =  ' + item.codigo)

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
        url: "https://localhost:44384/Factura/CargarProducto",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, item) {
                //console.log(item.codigo + ' = ' + valueOpcion)

                if (item.codigo == valueOpcion) {
                    document.getElementById('codigo').innerHTML = item.codigo
                    document.getElementById('medida').innerHTML = item.medida
                    document.getElementById('valor').innerHTML = item.valor
                    document.getElementById('iva').innerHTML = item.iva
                    document.getElementById('stock').innerHTML = item.stock

                }
            });

        }

    });

});


function cargarClientes() {

    let select = document.getElementById("selectCliente");

    $.ajax({
        url: "https://localhost:44384/Factura/CargarCliente",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, item) {

                let option = document.createElement("option")
                option.innerHTML = item.nombre + " " + item.apellido
                option.value = item.idCliente


                select.appendChild(option)
            });

        }

    });


}


$(document).on('click', '#selectCliente', function () {
    /*document.getElementById('selectCliente')*/
    let clienteSeleccionado = document.getElementById("selectCliente").value

    //console.log(clienteSeleccionado)

    $.ajax({
        url: "https://localhost:44384/Factura/CargarCliente",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, obj) {
                if (obj.idCliente == clienteSeleccionado) {
                    document.getElementById('cedulaCliente').innerHTML = obj.cedula
                    document.getElementById('direccionCliente').innerHTML = obj.direccion
                    document.getElementById('telefonoCliente').innerHTML = obj.telefono
                    document.getElementById('correoCliente').innerHTML = obj.email
                    idCliente = obj.idCliente
                }
            });

        }

    });

});



// Guardar Factura

function agregarItem() {

    let codigoProducto = document.getElementById("codigo").innerHTML;
    let producto = document.getElementById('selectProducto').options[document.getElementById('selectProducto').selectedIndex].text;
    let medida = document.getElementById('medida').innerHTML;
    let cantidad = document.getElementById("cantidad").value;
    let precio = document.getElementById("valor").innerHTML;
    let tipoIVA = document.getElementById("iva").innerHTML;

    let stock = document.getElementById('stock').innerHTML

    console.log('cantidad digitada: '+cantidad+' y el stock es: '+stock)
    if (parseInt(cantidad) <= stock) {
        if (!codigoProducto == "" & !producto == "" & !medida == "" & !cantidad == "" & !precio == "" & !tipoIVA == "") {
            array.push([codigoProducto, producto, medida, cantidad, precio, tipoIVA])

            console.log(array)

            hacerTabla()

            /* Limpiando opciones */
            document.getElementById("codigo").value = ""
            document.getElementById("selectProducto").value = ""
            document.getElementById('medida').innerHTML = ""
            document.getElementById("cantidad").value = ""
            document.getElementById("valor").value = ""
            document.getElementById("iva").value = ""
        } else {
            alert("Datos insuficientes")

        }

    } 
    else {
        alert("Fuera de stock")
        document.getElementById("cantidad").value = ""
     }


}


function hacerTabla() {
    let iva12 = 0
    let subtotal12 = 0
    let subtotal0 = 0
    let totalUs = 0
    let tablaV = `<thead>
   <tr>
   <th></th>
   <th>Codigo producto</th>
   <th>Descripcion</th>
   <th>Medida</th>
   <th>Cantidad</th>
   <th>Precio Unidad</th>
   <th>IVA</th>
   <th>Subtotal</th>
   </tr>
   </thead>
   <tbody>`

    //([codigoProducto, producto, medida, cantidad, precio, tipoIVA])


    for (let i = 0; i < array.length; i++) {
        tablaV += `<tr>
      <td><button class="btn btn-primary btnborrar" id='${i}'> - </button></td>
      <td id='${i}0'>${array[i][0]}</td>
      <td id='${i}1'>${array[i][1]}</td>
      <td id='${i}2'>${array[i][2]}</td>
      <td id='${i}3'>${array[i][3]}</td>
      <td id='${i}4'>${array[i][4]}</td>
      <td id='${i}5'>${array[i][5]}</td>
      <td id='${i}6'>${array[i][3] * array[i][4]}</td>
      </tr>`
        //console.log(array[i][4])

        if (array[i][5] == "0") {
            //console.log(" entra a condicion 0%")
            subtotal0 += parseFloat(array[i][3] * array[i][4])
        } else if (array[i][5] == "12") {
            //console.log("entra a condicion 12%")
            subtotal12 += parseFloat(array[i][3] * array[i][4])
            iva12 = Number(parseFloat(subtotal12 * 0.12).toFixed(2))

        }

        totalUs = parseFloat(subtotal12 + iva12 + subtotal0)
        totalUs.toFixed(2)
    }
    console.log(array)

    tablaV += `<tr>
   <td></td>
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
   <h3 id=totalUs>${totalUs.toFixed(2)}</h3>
   </th>
   </tr>
   </tbody>`

    document.getElementById("tablaVenta").innerHTML = tablaV

}


$(document).on('click', '.btnborrar', function () {
    let index = $(event.target).attr('id');
    array.splice(index, 1)
    console.log(array)
    $(event.target).closest('tr').remove();
    document.getElementById("tablaVenta").innerHTML = ""
    hacerTabla();
});


function guardarFactura() {

    let codigoFacturaCF = document.getElementById("codigoFactura").innerHTML;
    let idClienteCF = idCliente
    let fechaEmisionCF = document.getElementById("fechaEmision").innerHTML + ' ' + horaActual();
    let idUsuarioCF = localStorage.getItem("idUsuario");

    // Los siguientes elementos proviene de labels

    let subTotalCF = document.getElementById("subtotal12").innerHTML;
    let iva0CF = document.getElementById("subtotal0").innerHTML;
    let iva12CF = document.getElementById("iva12").innerHTML;
    let totalCF = document.getElementById("totalUs").innerHTML;

    let cabeceraFactura = [codigoFacturaCF, idClienteCF, fechaEmisionCF, idUsuarioCF, subTotalCF, iva0CF, iva12CF, totalCF]

    //console.log(cabeceraFactura)

    let detalleFactura = ""
    
    //([codigoProducto, producto, medida, cantidad, precio, tipoIVA])
    //codigoFacturaCF/codigoProdcutoDF/cantidadDF/precioDF/$

    for (let m = 0; m < array.length; m++) {
        var codigoProdcutoDF = document.getElementById("" + m + "0").innerHTML;
        var cantidadDF = document.getElementById("" + m + "3").innerHTML;
        var precioDF = document.getElementById("" + m + "4").innerHTML;


        let item = codigoFacturaCF + "/" + codigoProdcutoDF + "/" + cantidadDF + "/" + precioDF + "/$"
        detalleFactura = detalleFactura.concat(item)

        console.log(detalleFactura)

    }

    if (!cabeceraFactura == "" && !detalleFactura == "") {
        let datos = {
            "codigoFacturaCF": codigoFacturaCF,
            "idClienteCF": idClienteCF,
            "fechaEmisionCF": fechaEmisionCF,
            "idUsuarioCF": idUsuarioCF,
            "subTotalCF": subTotalCF,
            "iva0CF": iva0CF,
            "iva12CF": iva12CF,
            "totalCF": totalCF,
            "codigoProdcutoDF": "",
            "cantidadDF": "",
            "precioDF": "",
            "detalleFactura": detalleFactura
        }

        console.log(datos)

        $.ajax({
            url: "https://localhost:44384/Factura/GuardarFactura",
            type: "POST",
            data: JSON.stringify(datos),
            contentType: "application/json",
            success: function (datos) {
                //console.log(datos)
                alert("Venta registrada con exito")

                document.getElementById("tablaVenta").innerHTML = ""
                array = []
                console.log(array)

                document.getElementById("codigoFactura").innerHTML = '';
                document.getElementById("cantidad").value = '';

                document.getElementById('cedulaCliente').innerHTML = '';
                document.getElementById('direccionCliente').innerHTML = '';
                document.getElementById('telefonoCliente').innerHTML = '';
                document.getElementById('correoCliente').innerHTML = '';

                document.getElementById('codigo').innerHTML = '';
                document.getElementById('medida').innerHTML = '';
                document.getElementById('valor').innerHTML = '';
                document.getElementById('iva').innerHTML = '';
                document.getElementById('stock').innerHTML = '';

                datosDefault();

            }
        });

    } else {
        alert('Completa todos los campos')
    }


}


function CargarFacturas() {
    $.ajax({
        url: "https://localhost:44384/Factura/CargarFacturas",
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
            $tr.append("<td>Fecha de emision</td>");
            $tr.append("<td>Nombre cliente</td>");
            $tr.append("<td>Cedula</td>");
            $tr.append("<td>Total a pagar</td>");
            /*      $tr.append("<td></td>");*/

            $cabecera.append($tr);

            let cantidadFacturasE = 0
            cantidadFacturasE = conjunto.reduce(function (a, b) {
                return Math.max(a, b);
            }, -Infinity);

            console.log(cantidadFacturasE+' es la cantidad de facturas existentes')

            $.each(data, function (cantidadFacturasE, obj) {
                

                var $tr = $("<tr></tr>");
                //$tr.append("<td>" + <button class="btn btn-primary btnborrar" id='${i}'> Ver detalle </button> + "</td>")


                $tr.append("<td><button  id=" + obj.codigoFacturaCF + "  type='button' class='btn btn-primary btnVer' data-bs-toggle='modal' data-bs-target='#CargarFacturas'>Ver</button></td>'");
                $tr.append("<td>" + obj.codigoFacturaCF + "</td>");
                $tr.append("<td>" + obj.fechaEmisionCF + "</td>");

                $tr.append("<td>" + obj.nombreClienteCF + "" + obj.apellidoClienteCF + "</td>");
                $tr.append("<td>" + obj.cedulaClienteCF + "</td>");

                $tr.append("<td>" + obj.totalCF + "</td>");
                //$tr.append("<td>" + item.estado + "</td>");
                //$tr.append("<button type='button' class='btn btn-danger'>Elminar</button>");


                $pantalla.append($tr);

            });

            /console.log(data.clave)/
        }
    });

}


//Ver detalle de Factura

$(document).on('click', '.btnVer', function () {

    let compraSelecionada = $(event.target).attr('id');

    console.log(compraSelecionada)

    let datos = {
        "dato": compraSelecionada
    }

    $.ajax({
        url: "https://localhost:44384/Factura/BuscarFactura",
        type: "POST",
        data: JSON.stringify(datos),
        contentType: "application/json",
        success: function (data) {

            let tablaM = `<thead>
                    <tr>
                    <th>N</th>
                    <th>Codigo producto</th>
                    <th>Detalle factura</th>
                    <th>Cantidad</th>
                    <th>Precio unidad</th>
                    <th>Tipo IVA</th>
                    <th>Suma</th>
                    </tr>
                    </thead>`


            //let arrayM = data
            //console.log(arrayM)
            //console.log(data.length)

            $.each(data, function (idx, pro) {

                document.getElementById('nombreUsuarioCF').innerHTML = pro.nombreUsuarioCF + ' ' + pro.apellidoUsuarioCF;

                document.getElementById("codigoFacturaCF").innerHTML = pro.codigoFacturaCF;
                document.getElementById("fechaEmisionCF").innerHTML = pro.fechaEmisionCF;

                document.getElementById("nombreClienteCF").innerHTML = pro.nombreClienteCF;
                document.getElementById("cedulaClienteCF").innerHTML = pro.cedulaClienteCF;

                document.getElementById('apellidoClienteCF').innerHTML = pro.apellidoClienteCF;
                document.getElementById('telefonoClienteCF').innerHTML = pro.telefonoClienteCF;


                let cantidad = pro.cantidadDF;
                let precio = parseFloat(pro.precioDF).toFixed(2);
                //let precio = parseFloat(pro.precioDF.replace(",", ".")).toFixed(2);

                let suma = cantidad * precio;

                console.log("pro.cantidadDC: " + typeof cantidad)
                console.log("pro.precioDC: " + typeof precio)
                console.log("suma: " + typeof suma)

                tablaM += `<tr>
                    <td>'${idx + 1}'</td>
                    <td>${pro.codigoProdcutoDF}</td>
                    <td>${pro.detalleFactura}</td>
                    <td>${pro.cantidadDF}</td>
                    <td>${pro.precioDF}</td>
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
                <p id=subtotal12>${data[0].subTotalCF}</p>
                <p id=subtotal0>${data[0].iva0CF}</p>
                <p id=iva12>${data[0].iva12CF}</p>
                <h3 id=totalUs>${data[0].totalCF}</h3>
                </th>

                </tr>`

            document.getElementById("comprasM").innerHTML = tablaM
        }
    });
});

function cargarVendedor() {
    let cedula = localStorage.getItem("cedula");
    console.log(cedula + "  del vendedor")

    let req = { "dato": cedula }
    $.ajax({
        url: "https://localhost:44384/Usuario/BuscarUsuario",
        type: "POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        success: function (data) {

            let nombreApellido = data[0].nombre + "  " + data[0].apellido;

            document.getElementById('nombreVendedor').innerHTML = nombreApellido

            localStorage.setItem("idUsuario", data[0].idUsuario);
        }
    });


}

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
            url: "https://localhost:44384/Factura/GuardarCliente",
            type: "POST",
            data: JSON.stringify(req),
            contentType: "application/json",
            success: function (data) {
                console.log("Cliente guardado");
                document.getElementById("cedula").value = ""
                document.getElementById("nombre").value = ""
                document.getElementById("apellido").value = ""
                document.getElementById("direccion").value = ""
                document.getElementById("telefono").value = ""
                document.getElementById("email").value = ""
                alert('Cliente Guardado')

            }
        });
    } else {
        alert("Completa todos los Campos")
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

function limpiarCedula() {
    var val = document.getElementById("cedula").value;
    var tam = val.length;
    for (i = 0; i < tam; i++) {
        if (isNaN(val[i]))
            document.getElementById("cedula").value = '';
    }
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

