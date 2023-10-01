using FarmaVenta.Metodos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FarmaVenta.Models;
using System.Data;
using System.Web.UI.WebControls;

namespace FarmaVenta.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        //Verificacion de la contraseña
        public JsonResult Login(string cedula, string clave)
        {
            Conexion metodo = new Conexion();

            string consulta = "SELECT count(cedula) from usuario where cedula = '" + cedula + "' and contraseña = '" + clave + "';";

            DataTable dt = metodo.BD(consulta);

            
            string res = dt.Rows[0][0].ToString();

            Respuesta respuesta = new Respuesta()
            {
                clave = res
            };


            return Json(respuesta, JsonRequestBehavior.AllowGet);
        }

    }
}