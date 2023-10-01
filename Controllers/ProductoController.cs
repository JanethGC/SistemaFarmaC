using FarmaVenta.Metodos;
using FarmaVenta.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FarmaVenta.Controllers
{
    public class ProductoController : Controller
    {
        // GET: Producto
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista de Producto
        public JsonResult CargarProducto()
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            string consulta = "SELECT * from producto";

            var dt = metodo.ListarProducto(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Buscar Producto
        public JsonResult BuscarProducto(string dato)
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            string consulta = "SELECT * from producto where descripcion = '" + dato + "'";

            var dt = metodo.ListarProducto(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        //Insert Producto
        public JsonResult GuardarProducto(Producto datos)
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            if (datos.codigo != "" & datos.descripcion != "" & datos.medida != "" & datos.valor.ToString() != "")
            {
                string valor = ((datos.valor).ToString()).Replace(",", ".");
                string sqlQuery = "INSERT INTO producto(codigo, descripcion, medida, valor, stock) VALUES('" + datos.codigo + "', '" + datos.descripcion + "', '" + datos.medida + "', " + valor + ", 0);";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Producto Guardado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al insertar", JsonRequestBehavior.AllowGet);
            }


        }

        //Update Producto
        public JsonResult ActualizarProducto(Producto datos)
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            if (datos.codigo != "" & datos.descripcion != "" & datos.medida != "" & datos.valor.ToString() != "")
            {
                string valor = ((datos.valor).ToString()).Replace(",", ".");
                string sqlQuery = "UPDATE producto SET[codigo] = '" + datos.codigo + "' ,[descripcion] = '" + datos.descripcion + "' ,[medida] = '" + datos.medida + "' ,[valor] = '" + valor + "' WHERE idProducto = '" + datos.idProducto + "'";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Producto Actualizado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al actualizar", JsonRequestBehavior.AllowGet);
            }


        }

        //Delete Producto
        public JsonResult BorrarProducto(string dato)
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            string consulta = "DELETE FROM producto WHERE idProducto = '" + dato + "'";

            var dt = metodo.BDCon(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }


    }
}