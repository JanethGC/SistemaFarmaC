using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FarmaVenta.Models
{
    public class Kardex
    {
        public string fecha { get; set; }
        public string tipo { get; set; }
        public string proveedor { get; set; }
        public string cliente { get; set; }
        public string cantidadCompra { get; set; }
        public string cantidadVenta { get; set; }
        public string precioCompra { get; set; }
        public string precioVenta { get; set; }
        public string saldo { get; set; }
    }
}