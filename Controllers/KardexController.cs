using FarmaVenta.Metodos;
using FarmaVenta.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace FarmaVenta.Controllers
{
    public class KardexController : Controller
    {
        // GET: Kardex
        public ActionResult Index()
        {
            return View();
        }

        

        // GET: Lista de kardex Ingresos
        public JsonResult CargarKadexI(string dato)
        {
            KardexMantenimiento metodo = new KardexMantenimiento(); 
            string consulta = "SELECT cc.fechaCompra AS fecha, tipo = 'I', pro.nombre AS proveedor, cliente = '', dc.cantidad AS cantidadCompra, cantidadVenta = ''," +
                  " dc.precio AS precioCompra, precioVenta = '', p.stock AS saldo FROM cabeceraCompra AS cc INNER JOIN detalleCompra AS dc ON cc.numeroFactura = dc.numeroFactura INNER JOIN proveedor AS pro ON cc.idProveedor = pro.idProveedor " +
              "INNER JOIN producto AS p ON dc.codigoProdcuto = p.codigo WHERE dc.codigoProdcuto =  '" + dato + "'"; 
            var dt = metodo.CargarKardex(consulta); 
            return Json(dt, JsonRequestBehavior.AllowGet);
        }
        
        // GET: Lista de kardex Ingresos
        public JsonResult CargarKadexE(string dato)
        {
            KardexMantenimiento metodo = new KardexMantenimiento(); 
            string consulta = "SELECT cf.fechaEmision AS fecha, tipo = 'E', proveedor = '', cli.nombre + ' ' + cli.apellido AS cliente, \r\ncantidadCompra = '', df.cantidad AS cantidadVenta, precioCompra = '', df.precio AS precioVenta" +
                    ", \r\np.stock AS saldo FROM cabeceraFactura AS cf INNER JOIN detalleFactura AS df ON cf.codigoFactura = df.codigoFactura \r\nINNER JOIN cliente AS cli ON cf.idCliente = cli.idCliente " +
               "INNER JOIN producto AS p ON df.codigoProdcuto = p.codigo \r\nWHERE df.codigoProdcuto = '" + dato + "'"; 
            var dt = metodo.CargarKardex(consulta); 
            return Json(dt, JsonRequestBehavior.AllowGet);
        }


    }
}