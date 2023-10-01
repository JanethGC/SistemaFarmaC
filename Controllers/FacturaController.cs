using FarmaVenta.Metodos;
using FarmaVenta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FarmaVenta.Controllers
{
    public class FacturaController : Controller
    {
        // GET: Factura
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista de Facturas
        public JsonResult CargarFacturas()
        {
            FacturaMantenimiento metodo = new FacturaMantenimiento();

            string consulta = "select cf.codigoFactura, cf.idCliente, cli.nombre, cli.apellido, cli.cedula, cli.telefono, cf.fechaEmision, cf.idUsuario, us.nombre, us.apellido, us.rol, cf.subTotal, cf.iva0, cf.iva12, cf.total from cabeceraFactura as cf inner join cliente as cli on cli.idCliente = cf.idCliente inner join usuario as us on us.idUsuario = cf.idUsuario";

            var dt = metodo.ListarFacturas(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }
        // GET: Buscar Factura
        public JsonResult BuscarFactura(string dato)
        {
            FacturaMantenimiento metodo = new FacturaMantenimiento();

            string consulta = "select	cf.codigoFactura, cf.idCliente, cli.nombre, cli.apellido, cli.cedula, cli.telefono, cf.fechaEmision, cf.idUsuario, us.nombre, us.apellido, us.rol, cf.subTotal, cf.iva0, cf.iva12, cf.total, df.codigoProdcuto, pro.descripcion, df.cantidad, df.precio from cabeceraFactura as cf inner join detalleFactura as df on cf.codigoFactura = df.codigoFactura inner join cliente as cli on cli.idCliente = cf.idCliente inner join usuario as us on us.idUsuario = cf.idUsuario inner join producto as pro on pro.codigo = df.codigoProdcuto where cf.codigoFactura ='" + dato + "' AND df.codigoFactura = '" + dato + "'";

            var dt = metodo.ListarFacturas(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }


        // GET: Insert Factura
        public JsonResult GuardarFactura(Factura datos)
        {
            int dfLongitud = datos.detalleFactura.Count(f => f == '$');

            FacturaMantenimiento metodo = new FacturaMantenimiento();

            datos.fechaEmisionCF = DateTime.Now.ToString("yyyyMMdd hh:mm:ss");
            datos.subTotalCF = datos.subTotalCF.Replace(",", ".");
            datos.iva0CF = datos.iva0CF.Replace(",", ".");
            datos.iva12CF = datos.iva12CF.Replace(",", ".");
            datos.totalCF = datos.totalCF.Replace(",", ".");

            //datos.precioDF = datos.precioDF.Replace(",", ".");

            if (datos.codigoFacturaCF != "" & (datos.fechaEmisionCF).ToString() != "")
            //& datos.idClienteCF <= 0 & datos.idUsuarioCF <= 0
            {

                string sqlQuery = "INSERT INTO [dbo].[cabeceraFactura] ([codigoFactura],[idCliente],[fechaEmision],[idUsuario],[subTotal],[iva0],[iva12],[total]) VALUES ('" + datos.codigoFacturaCF + "', " + datos.idClienteCF + ", '" + datos.fechaEmisionCF + "', " + datos.idUsuarioCF + ", " + datos.subTotalCF + ", " + datos.iva0CF + ", " + datos.iva12CF + ", " + datos.totalCF + ");";
                var dt1 = metodo.BDCon(sqlQuery);

                string[] dfFILAS = datos.detalleFactura.Split('$');


                for (int i = 0; i < dfLongitud; i++)
                {

                    string[] dfCOLUMNAS = dfFILAS[i].Split('/');

                    datos.codigoFacturaCF = dfCOLUMNAS[0];
                    datos.codigoProdcutoDF = dfCOLUMNAS[1];
                    datos.cantidadDF = int.Parse(dfCOLUMNAS[2]);
                    datos.precioDF = dfCOLUMNAS[3];

                    datos.cantidadDF = int.Parse((datos.cantidadDF).ToString().Replace(",", "."));
                    datos.precioDF = datos.precioDF.Replace(",", ".");


                    string sqlQuery2 = "INSERT INTO [dbo].[detalleFactura] ([codigoFactura],[codigoProdcuto],[cantidad],[precio]) VALUES ('" + datos.codigoFacturaCF + "', '" + datos.codigoProdcutoDF + "', " + datos.cantidadDF + ", " + datos.precioDF + ");";
                    var dt2 = metodo.BDCon(sqlQuery2);

                    string sqlQuery3 = "update [dbo].producto set [stock] = ( (select stock from producto  where codigo = " + datos.codigoProdcutoDF + ") - " + datos.cantidadDF + " ) where codigo = " + datos.codigoProdcutoDF + "";
                    var dt3 = metodo.BDCon(sqlQuery3);

                }


                return Json("Factura Guardada", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al guardar la Factura", JsonRequestBehavior.AllowGet);
            }

        }


        // GET: Editar Factura
        public JsonResult ActualizarFactura(Factura datos)
        {
            FacturaMantenimiento metodo = new FacturaMantenimiento();

            datos.subTotalCF = datos.subTotalCF.Replace(",", ".");
            datos.iva0CF = datos.iva0CF.Replace(",", ".");
            datos.iva12CF = datos.iva12CF.Replace(",", ".");
            datos.totalCF = datos.totalCF.Replace(",", ".");

            datos.precioDF = datos.precioDF.Replace(",", ".");

            if (datos.codigoFacturaCF != "" & (datos.fechaEmisionCF).ToString() != "" &
                datos.idClienteCF <= 0 & datos.idUsuarioCF <= 0)
            {

                string sqlQuery = "UPDATE cabeceraFactura SET [idCliente] = " + datos.idClienteCF + " ,[fechaEmision] = " + datos.fechaEmisionCF + " ,[idUsuario] = " + datos.idUsuarioCF + " ,[subTotal] = " + datos.subTotalCF + " ,[iva0] = " + datos.iva0CF + " ,[iva12] = " + datos.iva12CF + " ,[total] = " + datos.totalCF + " WHERE codigoFactura = '" + datos.codigoFacturaCF + "'";
                var dt1 = metodo.BDCon(sqlQuery);

                string sqlQuery2 = "UPDATE detalleFactura SET[codigoProdcuto] = " + datos.codigoProdcutoDF + " ,[cantidad] = " + datos.cantidadDF + " ,[precio] = " + datos.precioDF + " WHERE codigoFactura = '" + datos.codigoFacturaCF + "'";
                var dt2 = metodo.BDCon(sqlQuery2);

                string sqlQuery3 = "update [dbo].producto set [stock] = ( (select stock from producto) - " + datos.cantidadDF + " ) where codigo = " + datos.codigoProdcutoDF + "";
                var dt3 = metodo.BDCon(sqlQuery3);

                return Json("Factura Guardada", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al guardar la Factura", JsonRequestBehavior.AllowGet);
            }

        }

        // GET: Eliminar Factura
        public JsonResult BorrarFactura(string dato)
        {
            CompraMantenimiento metodo = new CompraMantenimiento();

            string consulta2 = "DELETE FROM detalleFactura WHERE codigoFactura = '" + dato + "'";
            var dt2 = metodo.BDCon(consulta2);

            string consulta = "DELETE FROM cabeceraFactura WHERE codigoFactura = '" + dato + "'";
            var dt = metodo.BDCon(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        // GET: Lista de Cliente
        public JsonResult CargarCliente()
        {
            ClienteMantenimiento metodo = new ClienteMantenimiento();

            string consulta = "SELECT * from cliente";

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

        // GET: Lista de Producto
        public JsonResult CargarProducto()
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            string consulta = "SELECT distinct  p.codigo, p.descripcion, p.medida, p.valor, p.stock, dc.iva from producto as p inner join detalleCompra as dc on p.codigo = dc.codigoProdcuto";

            var dt = metodo.ProductoSelect(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

        //Insert Producto
        public JsonResult GuardarProducto(Producto datos)
        {
            ProductoMantenimiento metodo = new ProductoMantenimiento();

            if (datos.codigo != "" & datos.descripcion != "" & datos.medida != "" & datos.valor.ToString() != "")
            {
                string valor = ((datos.valor).ToString()).Replace(",", ".");
                string sqlQuery = "INSERT INTO producto(codigo, descripcion, medida, valor) VALUES('" + datos.codigo + "', '" + datos.descripcion + "', '" + datos.medida + "', " + valor + ");";

                var dt1 = metodo.BDCon(sqlQuery);

                return Json("Producto Guardado", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("Error al insertar", JsonRequestBehavior.AllowGet);
            }

        }

        //restar a STOCK

    }
}