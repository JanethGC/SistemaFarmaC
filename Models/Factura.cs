using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FarmaVenta.Models
{
    public class Factura
    {
        //******************
        public string codigoFacturaCF { get; set; }

        public int idClienteCF { get; set; }
        public string nombreClienteCF { get; set; }
        public string apellidoClienteCF { get; set; }
        public string cedulaClienteCF { get; set; }
        public string telefonoClienteCF { get; set; }

        public string fechaEmisionCF { get; set; }

        public int idUsuarioCF { get; set; }
        public string nombreUsuarioCF { get; set; }
        public string apellidoUsuarioCF { get; set; }
        public string rolUsuarioCF { get; set; }

        public string subTotalCF { get; set; }
        public string iva0CF { get; set; }
        public string iva12CF { get; set; }
        public string totalCF { get; set; }


        //******************
        public string codigoProdcutoDF { get; set; }
        //public string descripcionDF { get; set; }

        public int cantidadDF { get; set; }
        public string precioDF { get; set; }
        public string detalleFactura { get; set; }
        public string iva { get; set; }

    }
}