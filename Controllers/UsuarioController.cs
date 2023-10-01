using FarmaVenta.Metodos;
using FarmaVenta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FarmaVenta.Controllers
{
    public class UsuarioController : Controller
    {
        // GET: Usuario
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista de Usuarios
        public JsonResult CargarUsuarios()
        {
            UsuarioMantenimiento metodo = new UsuarioMantenimiento();

            string consulta = "SELECT * from usuario";

            var dt = metodo.ListarUsuario(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Buscar Usuario
        public JsonResult BuscarUsuario(string dato)
        {
            UsuarioMantenimiento metodo = new UsuarioMantenimiento();

            string consulta = "SELECT * from usuario where cedula='"+ dato +"'";

            var dt = metodo.ListarUsuario(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        //Insert Usuario
        public JsonResult GuardarUsuario(Usuario datos)
        {
            UsuarioMantenimiento metodo = new UsuarioMantenimiento();

            if (datos.nombre != "" & datos.apellido != "" & datos.rol != "" & datos.contraseña != "" & datos.cedula != "") {
                
                string sqlQuery = "INSERT INTO usuario(nombre, apellido, rol, contraseña, cedula) VALUES('"+ datos.nombre +"', '"+ datos.apellido +"', '"+ datos.rol +"', '"+ datos.contraseña +"', '"+ datos.cedula +"');";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Usuario Guardado", JsonRequestBehavior.AllowGet);
            }
            else {
                return Json("Error al insertar", JsonRequestBehavior.AllowGet);
            }


        }

        //Update Usuario
        public JsonResult ActualizarUsuario(Usuario datos)
        {
            UsuarioMantenimiento metodo = new UsuarioMantenimiento();

            if (datos.nombre != "" & datos.apellido != "" & datos.rol != "" & datos.contraseña != "" & datos.cedula != "")
            {

                string sqlQuery = "UPDATE usuario SET[nombre] = '" + datos.nombre + "' ,[apellido] = '" + datos.apellido + "' ,[rol] = '" + datos.rol + "' ,[contraseña] = '" + datos.contraseña + "' ,[cedula] = '" + datos.cedula + "' WHERE cedula = '" + datos.cedula + "'";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Usuario Actualizado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al actualizar", JsonRequestBehavior.AllowGet);
            }


        }

        //Delete Usuario
        public JsonResult BorrarUsuario(string dato)
        {
            UsuarioMantenimiento metodo = new UsuarioMantenimiento();

            string consulta = "DELETE FROM usuario WHERE idUsuario = '" + dato + "'";

            var dt = metodo.BDCon(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

    }
}