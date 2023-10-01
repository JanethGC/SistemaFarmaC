using FarmaVenta.Metodos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FarmaVenta.Controllers
{
    public class CierreCajaController : Controller
    {
        // GET: CierreCaja
        public ActionResult Index()
        {
            return View();
        }

        // GET: Lista de Cierre de Caja
        public JsonResult CargarCierreCajaEmpleado(string dato)
        {
            CierreCajaMantenimiento metodo = new CierreCajaMantenimiento();

            string consulta = " SELECT CONVERT(varchar(8), cv.fechaEmision, 108) as hora, cv.codigoFactura as numeroFactura, (cli.nombre+ ' '+cli.apellido) as cliente, cv.total as totalVendido\r\nFROM cabeceraFactura as cv \r\nINNER JOIN cliente as cli ON cv.idCliente = cli.idCliente\r\nWHERE cv.idUsuario = '"+ dato +"' AND cv.fechaEmision >= CONVERT(datetime, CONVERT(varchar(8), GETDATE(), 112)) ";

            var dt = metodo.CargarCierreCaja(consulta);

            return Json(dt, JsonRequestBehavior.AllowGet);
        }

    }
}