using FarmaVenta.Metodos;
using FarmaVenta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FarmaVenta.Controllers
{
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista de Cliente
        public JsonResult CargarCliente()
        {
            ClienteMantenimiento metodo = new ClienteMantenimiento();

            string consulta = "SELECT * from cliente";

            var dt = metodo.ListarCliente(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Buscar Cliente
        public JsonResult BuscarCliente(string dato)
        {
            ClienteMantenimiento metodo = new ClienteMantenimiento();

            string consulta = "SELECT * from cliente where cedula = '" + dato + "'";

            var dt = metodo.ListarCliente(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        //Insert Cliente
        public JsonResult GuardarCliente(Cliente datos)
        {
            ClienteMantenimiento metodo = new ClienteMantenimiento();

            if (datos.cedula != "" & datos.nombre != "" & datos.apellido != "" & datos.direccion != "" & datos.telefono != "" & datos.email != "")
            {

                string sqlQuery = "INSERT INTO cliente(cedula, nombre, apellido, direccion, telefono,email) VALUES('" + datos.cedula + "', '" + datos.nombre + "', '" + datos.apellido + "', '" + datos.direccion + "', '" + datos.telefono + "', '" + datos.email + "');";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Cliente Guardado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al insertar", JsonRequestBehavior.AllowGet);
            }


        }

        //Update Cliente
        public JsonResult ActualizarCliente(Cliente datos)
        {
            ClienteMantenimiento metodo = new ClienteMantenimiento();

            if (datos.cedula != "" & datos.nombre != "" & datos.apellido != "" & datos.direccion != "" & datos.telefono != "" & datos.email != "")
            {

                string sqlQuery = "UPDATE cliente SET[cedula] = '" + datos.cedula + "' ,[nombre] = '" + datos.nombre + "' ,[apellido] = '" + datos.apellido + "' ,[direccion] = '" + datos.direccion + "' ,[telefono] = '" + datos.telefono + "' ,[email] = '" + datos.email + "' WHERE idCliente = '" + datos.idCliente + "'";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Cliente Actualizado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al actualizar", JsonRequestBehavior.AllowGet);
            }


        }

        //Delete Cliente
        public JsonResult BorrarCliente(string dato)
        {
            ClienteMantenimiento metodo = new ClienteMantenimiento();

            string consulta = "DELETE FROM cliente WHERE idCliente = '" + dato + "'";

            var dt = metodo.BDCon(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

    }
}