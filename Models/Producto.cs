using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FarmaVenta.Models
{
    public class Producto
    {
        public int idProducto { get; set; }
        public string codigo { get; set; }
        public string descripcion { get; set; }
        public string medida { get; set; }
        public double valor { get; set; }
        public string stock { get; set; }
        public string iva { get; set; }
    }
}