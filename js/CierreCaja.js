cargarVendedor();
fecha()
cierreCaja()

let datos = []
let array = []
var conjunto = []
var idUsuario = ''

function fecha() {
    let date = new Date().toLocaleDateString();
    document.getElementById('fechaEmision').innerHTML = date
}

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

function cierreCaja() {
    let suma = 0;

    idUsuario= localStorage.getItem("idUsuario");

    let dato = {
        "dato" :idUsuario
    }

    $.ajax({
        url: "https://localhost:44384/CierreCaja/CargarCierreCajaEmpleado",
        type: "POST",
        data: JSON.stringify(dato),
        contentType: "application/json",
        success: function (data) {

            console.log(data);

            let tablaM = `<thead>
                    <tr>
                    <th>Hora</th>
                    <th>Numero de factura</th>
                    <th>Cliente</th>
                    <th>Total vendido</th>
                    </tr>
                    </thead>`

            $.each(data, function (i, obj) {

                tablaM += `<tr>
                    <td>${obj.hora}</td>
                    <td>${obj.numeroFactura}</td>
                    <td>${obj.cliente}</td>
                    <td>${obj.totalVendido}</td>
                    </tr>`

                suma = suma + parseFloat(obj.totalVendido.replace(",", "."))
    

            });

            tablaM += `<tr>
                <td></td>
                <td></td>
             
                <th>
                <h3>TOTAL CAJA $:</h3>
                </th>

                <th>
                <h3>${suma.toFixed(2)}</h3>
                </th>

                </tr>`

            document.getElementById("tablaFactura").innerHTML = tablaM


        }
    });

}



