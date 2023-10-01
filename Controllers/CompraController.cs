using FarmaVenta.Metodos;
using FarmaVenta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static System.Net.Mime.MediaTypeNames;

namespace FarmaVenta.Controllers
{
    public class CompraController : Controller
    {
        // GET: Compra
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista de Compras
        public JsonResult CargarCompras()
        {
            CompraMantenimiento metodo = new CompraMantenimiento();

            string consulta = "select cc.numeroFactura, cc.fechaCompra, prv.idProveedor, prv.nombre, prv.ruc, prv.direccion, prv.telefono, prv.email, cc.subTotal, cc.iva0, cc.iva12, cc.total from cabeceraCompra as cc inner join proveedor as prv on cc.idProveedor = prv.idProveedor";

            var dt = metodo.ListarCompras(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Buscar Compra
        public JsonResult BuscarCompra(string dato)
        {
            CompraMantenimiento metodo = new CompraMantenimiento();

            Compra compra = new Compra();

            string consultaCC = "select cc.numeroFactura, cc.fechaCompra, prv.idProveedor, prv.nombre, prv.ruc, prv.direccion, prv.telefono, prv.email, cc.subTotal, cc.iva0, cc.iva12, cc.total, dc.codigoProdcuto, p.descripcion, dc.iva, dc.cantidad, dc.precio from cabeceraCompra as cc inner join proveedor as prv on cc.idProveedor = prv.idProveedor inner join detalleCompra as dc on dc.numeroFactura = cc.numeroFactura inner join producto as p on dc.codigoProdcuto = p.codigo where dc.numeroFactura = '" + dato + "'";
            //select cc.numeroFactura, cc.fechaCompra, prv.idProveedor, prv.nombre, prv.ruc, prv.direccion, prv.telefono, prv.email, cc.subTotal, cc.iva0, cc.iva12, cc.total, dc.codigoProdcuto, p.descripcion, dc.iva, dc.cantidad, dc.precio from cabeceraCompra as cc inner join proveedor as prv on cc.idProveedor = prv.idProveedor inner join detalleCompra as dc on dc.numeroFactura = cc.numeroFactura inner join producto as p on dc.codigoProdcuto = p.codigo where dc.numeroFactura = '2626'

            var dt = metodo.CargarCompra(consultaCC);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }


        // GET: Insert Compra
        public JsonResult GuardarCompra(Compra datos)
        {
            int dcLongitud = datos.detalleCompra.Count(f => f == '$');

            CompraMantenimiento metodo = new CompraMantenimiento();

            datos.fechaCompraCC = datos.fechaCompraCC.Replace("-", "");
            datos.subTotalCC = datos.subTotalCC.Replace(",", ".");
            datos.iva0CC = datos.iva0CC.Replace(",", ".");
            datos.iva12CC = datos.iva12CC.Replace(",", ".");
            datos.totalCC = datos.totalCC.Replace(",", ".");

            if (datos.numeroFacturaCC != "" & (datos.fechaCompraCC).ToString() != "" &
                datos.numeroFacturaDC != "" & datos.codigoProdcutoDC != "")
            {

                string sqlQuery = "INSERT INTO [dbo].[cabeceraCompra] ([numeroFactura],[fechaCompra],[idProveedor],[subTotal],[iva0],[iva12],[total]) VALUES ('" + datos.numeroFacturaCC + "', '" + datos.fechaCompraCC + "', " + datos.idProveedorCC + ", " + datos.subTotalCC + ", " + datos.iva0CC + ", " + datos.iva12CC + ", " + datos.totalCC + ");";
                var dt1 = metodo.BDCon(sqlQuery);

                string[] dcFILAS = datos.detalleCompra.Split('$');

                for (int i = 0; i < dcLongitud; i++)
                {

                    string[] dcCOLUMNAS = dcFILAS[i].Split('/');

                    datos.codigoProdcutoDC = dcCOLUMNAS[0];
                    datos.cantidadDC = dcCOLUMNAS[1];
                    datos.precioDC = dcCOLUMNAS[2];
                    datos.iva = dcCOLUMNAS[3];

                    datos.cantidadDC = datos.cantidadDC.Replace(",", ".");
                    datos.precioDC = datos.precioDC.Replace(",", ".");

                    string sqlQuery2 = "INSERT INTO [dbo].[detalleCompra] ([numeroFactura],[codigoProdcuto],[cantidad],[precio],[iva] ) VALUES ('" + datos.numeroFacturaDC + "', '" + datos.codigoProdcutoDC + "', " + datos.cantidadDC + ", " + datos.precioDC + ", " + datos.iva + ");";
                    var dt2 = metodo.BDCon(sqlQuery2);

                    string sqlQuery3 = "update [dbo].producto set [stock] = ( (select stock from producto where codigo = " + datos.codigoProdcutoDC + ") + " + datos.cantidadDC + " ) where codigo = " + datos.codigoProdcutoDC + "";
                    var dt3 = metodo.BDCon(sqlQuery3);
                }

                return Json("Factura Guardada", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al guardar la Factura", JsonRequestBehavior.AllowGet);
            }

        }

        // GET: Editar Compra
        public JsonResult ActualizarCompra(Compra datos)
        {
            CompraMantenimiento metodo = new CompraMantenimiento();

            datos.subTotalCC = datos.subTotalCC.Replace(",", ".");
            datos.iva0CC = datos.iva0CC.Replace(",", ".");
            datos.iva12CC = datos.iva12CC.Replace(",", ".");
            datos.totalCC = datos.totalCC.Replace(",", ".");

            datos.cantidadDC = datos.cantidadDC.Replace(",", ".");
            datos.precioDC = datos.precioDC.Replace(",", ".");
            datos.precioDC = datos.precioDC.Replace(",", ".");

            if (datos.numeroFacturaCC != "" & (datos.fechaCompraCC).ToString() != "" &
                datos.numeroFacturaDC != "" & datos.codigoProdcutoDC != "")
            {

                string sqlQuery = "UPDATE cabeceraCompra SET[fechaCompra] = " + datos.fechaCompraCC + " ,[idProveedor] = " + datos.idProveedorCC + " ,[subTotal] = " + datos.subTotalCC + " ,[iva0] = " + datos.iva0CC + " ,[iva12] = " + datos.iva12CC + " ,[total] = " + datos.totalCC + " WHERE numeroFactura = '" + datos.numeroFacturaCC + "'";
                var dt1 = metodo.BDCon(sqlQuery);

                string sqlQuery2 = "UPDATE detalleCompra SET[codigoProdcuto] = " + datos.codigoProdcutoDC + " ,[cantidad] = " + datos.cantidadDC + " ,[precio] = " + datos.precioDC + " WHERE numeroFactura = '" + datos.numeroFacturaDC + "'";
                var dt2 = metodo.BDCon(sqlQuery2);

                string sqlQuery3 = "update [dbo].producto set [stock] = ( (select stock from producto) + " + datos.cantidadDC + " ) where codigo = " + datos.codigoProdcutoDC + "";
                var dt3 = metodo.BDCon(sqlQuery3);

                return Json("Factura Actualizada", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al actualizar la Factura", JsonRequestBehavior.AllowGet);
            }

        }

        // GET: Eliminar Compra
        public JsonResult BorrarCompra(string dato)
        {
            CompraMantenimiento metodo = new CompraMantenimiento();

            string consulta2 = "DELETE FROM detalleCompra WHERE numeroFactura = '" + dato + "'";
            var dt2 = metodo.BDCon(consulta2);

            string consulta = "DELETE FROM cabeceraCompra WHERE numeroFactura = '" + dato + "'";
            var dt = metodo.BDCon(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Listar Proveedores
        public JsonResult CargarProveedor()
        {
            ProveedorMantenimiento metodo = new ProveedorMantenimiento();

            string consulta = "SELECT * from proveedor";

            var dt = metodo.ListarProveedor(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Insert Proveedores
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

        // GET: Lista de Producto
        public JsonResult CargarProducto()
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            string consulta = "SELECT * from producto";

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

        //agregar a STOCK

    }
}