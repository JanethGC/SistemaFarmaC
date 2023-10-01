using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FarmaVenta.Models
{
    public class Compra
    {
        //******************
        public int idCabeceraCompra { get; set; }
        public string numeroFacturaCC { get; set; }
        public string fechaCompraCC { get; set; }
        public int idProveedorCC { get; set; }

        public string nombreProveedorCC { get; set; }
        public string rucProveedorCC { get; set; }
        public string direccionProveedorCC { get; set; }
        public string telefonoProveedorCC { get; set; }
        public string emailProveedorCC { get; set; }

        public string subTotalCC { get; set; }
        public string iva0CC { get; set; }
        public string iva12CC { get; set; }
        public string totalCC { get; set; }
        public string iva { get; set; }

        //******************
        public string numeroFacturaDC { get; set; }
        public string codigoProdcutoDC { get; set; }
        public string cantidadDC { get; set; }
        public string precioDC { get; set; }
        public string detalleCompra { get; set; }
        public string descripcion { get; set; }

    }
}