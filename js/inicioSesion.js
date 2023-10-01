
function validarLogin() {
    var cedula = document.getElementById("usuario").value;
    var clave = document.getElementById("contrasena").value;

    var req = {
        "cedula": cedula,
        "clave": clave
    }
    $.ajax({
        url: "https://localhost:44384/Login/Login",
        type: "POST",
        data: JSON.stringify(req),
        contentType: "application/json",
        success: function (data) {
            if (data.clave == 1) {
                localStorage.setItem("cedula", cedula);
                alert("Inicio de sesion exitoso");
                window.close("/Login/Index");
                window.open("/Index/Index");
                
                
            } else {

                alert("Usuario o contraseña incorrectas");
            }

        }
    });

}






