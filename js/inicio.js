const toggle = document.querySelector(".toggle")
const menuDashboard = document.querySelector(".menu-dashboard")
const iconoMenu = toggle.querySelector("i")
const enlacesMenu = document.querySelectorAll(".enlace")
var sub_enlace = document.querySelectorAll(".sub-enlace")




toggle.addEventListener("click", () => {
    menuDashboard.classList.toggle("open")
    if (iconoMenu.classList.contains("bx-menu")) {
        iconoMenu.classList.replace("bx-menu", "bx-x")
        sub_enlace.forEach(enlace => {
            enlace.classList.replace("sub-enlace", "sub_enlace_show")

        })
    } else {
        iconoMenu.classList.replace("bx-x", "bx-menu")
        sub_enlace.forEach(enlace => {
            enlace.classList.replace("sub_enlace_show", "sub-enlace")

        })
    }
})

enlacesMenu.forEach(enlace => {
    enlace.addEventListener("click", () => {
        menuDashboard.classList.add("open")
        iconoMenu.classList.replace("bx-menu", "bx-x")
        sub_enlace.forEach(enlace => {
            enlace.classList.replace("sub-enlace", "sub_enlace_show")

        })
    })
})

//DESABILITA LAS OPCIONES DEL MENU SEGUN EL ROL CON QUE SE INGRESE AL SISTEMA

function desabilitarOpciones() {
    let cedula = localStorage.getItem("cedula");
    console.log(cedula)

    let req = { "dato": cedula }
    $.ajax({
        url: "https://localhost:44384/Usuario/BuscarUsuario",
        type: "POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        success: function (data) {
            let rol = data[0].rol;
            if (rol == "1") {
                document.getElementById("div_clientes").innerHTML = ""
                document.getElementById("div_facturar").innerHTML = ""
                document.getElementById("currentRol").innerHTML = "Rol: Administrador";

            } else if (rol == "2") {
                document.getElementById("div_proveedores").innerHTML = ""
                document.getElementById("div_usuarios").innerHTML = ""
                document.getElementById("div_comprar").innerHTML = ""
                document.getElementById("div_productos").innerHTML = ""
                document.getElementById("currentRol").innerHTML = "Rol: Vendedor";
            } else {
                document.getElementById("currentRol").innerHTML = "Rol: SuperAdmin";
            }
        }
    });   


}

//CERRAR SESION
function cierreLogin() {
    alert("Cierre sesion");
    window.open("/Login/Index");
    window.close("/Index/Index");
}



//CARGA EL NOMBRE DE USUARIO

function nombreUsuario() {
    var cedula = localStorage.getItem("cedula");
    var req = {"dato": cedula}
    $.ajax({
        url: "https://localhost:44384/Usuario/BuscarUsuario",
        type: "POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        success: function (data) {
            document.getElementById("currentUser").innerHTML = data[0].nombre + "  " + data[0].apellido;
        }
    });

}



function PeticionGenerica() {

    $.ajax({
        url: "/Usuario/Index",
        type: "GET",
        data: data,
        contentType: "application/json",
        sucess: function (data) {
            alert("Datos guardados");
            return data
        },
        error: function (request, msg, error) {
            alert("Error InsertarMetricas!!!");
        }
    });

}





















