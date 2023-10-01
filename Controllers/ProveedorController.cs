using FarmaVenta.Metodos;
using FarmaVenta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FarmaVenta.Controllers
{
    public class ProveedorController : Controller
    {
        // GET: Proveedor
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista de Proveedor
        public JsonResult CargarProveedor()
        {
            ProveedorMantenimiento metodo = new ProveedorMantenimiento();

            string consulta = "SELECT * from proveedor";

            var dt = metodo.ListarProveedor(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Buscar Proveedor
        public JsonResult BuscarProveedor(string dato)
        {
            ProveedorMantenimiento metodo = new ProveedorMantenimiento();

            string consulta = "SELECT * from proveedor where ruc='"+ dato +"'";

            var dt = metodo.ListarProveedor(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        //Insert Usuario
        public JsonResult GuardarProveedor(Proveedor datos)
        {
            ProveedorMantenimiento metodo = new ProveedorMantenimiento();

            if (datos.ruc != "" & datos.nombre != "" & datos.telefono != "" & datos.direccion != "" & datos.email != "")
            {

                string sqlQuery = "INSERT INTO proveedor(ruc, nombre, telefono, direccion, email) VALUES('" + datos.ruc + "', '" + datos.nombre + "', '" + datos.telefono + "', '" + datos.direccion + "', '" + datos.email + "');";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Proveedor Guardado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al insertar", JsonRequestBehavior.AllowGet);
            }


        }

        //Update Usuario
        public JsonResult ActualizarProveedor(Proveedor datos)
        {
            ProveedorMantenimiento metodo = new ProveedorMantenimiento();

            if (datos.ruc.ToString() != "" & datos.nombre != "" & datos.telefono != "" & datos.direccion != "" & datos.email != "")
            {

                string sqlQuery = "UPDATE proveedor SET[ruc] = '" + datos.ruc + "' ,[nombre] = '" + datos.nombre + "' ,[telefono] = '" + datos.telefono + "' ,[direccion] = '" + datos.direccion + "' ,[email] = '" + datos.email + "' WHERE idProveedor = '" + datos.idProveedor + "'";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Proveedor Actualizado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al actualizar", JsonRequestBehavior.AllowGet);
            }


        }

        //Delete Usuario
        public JsonResult BorrarProveedor(string dato)
        {
            ProveedorMantenimiento metodo = new ProveedorMantenimiento();

            string consulta = "DELETE FROM proveedor WHERE idProveedor = '" + dato + "'";

            var dt = metodo.BDCon(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

    }
}