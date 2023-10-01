//CargarKardexT();
cargarProductos();

var arrayI = [];
var arrayE = [];
var codigop = '';

function cargarProductos() {

    let select = document.getElementById("selectProducto");

    $.ajax({
        url: "https://localhost:44384/Producto/CargarProducto",
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
    let valueOpcion = document.getElementById("selectProducto").value

    $.ajax({
        url: "https://localhost:44384/Factura/CargarProducto",
        type: "GET",
        data: JSON.stringify(),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, item) {

                if (item.codigo == valueOpcion) {
                    codigop = item.codigo
                    cargarArrays();
                }
            });

        }

    });

});


function cargarArrays() {
    arrayI = [];
    arrayE = [];

    let dato = {
        "dato": codigop
    }

    $("#pantalla").empty();
    var $pantalla = $("#pantalla");

    $("#cabecera").empty();
    var $cabecera = $("#cabecera");

    var $tr = $("<tr></tr>");
    $tr.append("<th>Fecha</th>");
    $tr.append("<th>Tipo</th>");
    $tr.append("<th>Proveedor</th>");
    $tr.append("<th>Cliente</th>");
    $tr.append("<th>Cantidad de Compra</th>");
    $tr.append("<th>Cantidad de Venta</th>");
    $tr.append("<th>Precio de Compra</th>");
    $tr.append("<th>Precio de Venta</th>");

    $cabecera.append($tr);

    $.ajax({
        url: "https://localhost:44384/Kardex/CargarKadexI",
        type: "POST",
        data: JSON.stringify(dato),
        contentType: "application/json",
        success: function (data) {
           

                 $.each(data, function (idx, item) {
                    arrayI.push(item)
                    console.log(arrayI)

                     var $tr = $("<tr></tr>");

                     $tr.append("<td>" + item.fecha + "</td>");
                     $tr.append("<td>" + item.tipo + "</td>");

                     $tr.append("<td>" + item.proveedor + "</td>");
                     $tr.append("<td>  </td>");

                     $tr.append("<td>" + item.cantidadCompra + "</td>");
                     $tr.append("<td>  </td>");

                     $tr.append("<td>" + item.precioCompra + "</td>");
                     $tr.append("<td>  </td>");


   
                     $pantalla.append($tr);


                });
      
        }

    });

    $.ajax({
        url: "https://localhost:44384/Kardex/CargarKadexE",
        type: "POST",
        data: JSON.stringify(dato),
        contentType: "application/json",
        success: function (data) {
            $.each(data, function (idx, egre) {
                arrayE.push(egre)
                console.log(arrayE)


                $tr = $("<tr></tr>");

                $tr.append("<td>" + egre.fecha + "</td>");
                $tr.append("<td>" + egre.tipo + "</td>");

                $tr.append("<td> </td>");
                $tr.append("<td> " + egre.cliente + " </td>");

                $tr.append("<td></td>");
                $tr.append("<td> " + egre.cantidadVenta + " </td>");

                $tr.append("<td></td>");
                $tr.append("<td> " + egre.precioVenta + " </td>");




                $pantalla.append($tr);

                document.getElementById("inventarioA").innerHTML=egre.saldo



            });

        }

    });

}

function CargarKardexT() {

    $.ajax({
        url: "https://localhost:44384/Kardex/CargarKardexT",
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
            $tr.append("<th>Fecha</th>");
            $tr.append("<th>Tipo</th>");
            $tr.append("<th>Proveedor</th>");
            $tr.append("<th>Cliente</th>");
            $tr.append("<th>Cantidad de Compra</th>");
            $tr.append("<th>Cantidad de Venta</th>");
            $tr.append("<th>Precio de Compra</th>");
            $tr.append("<th>Precio de Venta</th>");
            $tr.append("<th>Saldo</th>");
            /*      $tr.append("<td></td>");*/

            $cabecera.append($tr);



            $.each(data, function (idx, item) {

                var $tr = $("<tr></tr>");
                //$tr.append("<td>" + <button class="btn btn-primary btnborrar" id='${i}'> Ver detalle </button> + "</td>")

                $tr.append("<td>" + item.fecha + "</td>");
                $tr.append("<td>" + item.tipo + "</td>");

                $tr.append("<td>" + item.proveedor + "</td>");
                $tr.append("<td>" + item.cliente + "</td>");

                $tr.append("<td>" + item.cantidadCompra + "</td>");
                $tr.append("<td>" + item.cantidadVenta + "</td>");

                $tr.append("<td>" + item.precioCompra + "</td>");
                $tr.append("<td>" + item.precioVenta + "</td>");

                $tr.append("<td>" + item.saldo + "</td>");

                //$tr.append("<td>" + item.estado + "</td>");
                //$tr.append("<button type='button' class='btn btn-danger'>Elminar</button>");


                $pantalla.append($tr);

            });

            /*console.log(data.clave)*/
        }
    });

}





