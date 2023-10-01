using FarmaVenta.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace FarmaVenta.Metodos
{
    public class CompraMantenimiento
    {
        Conexion conexion = new Conexion();

        //Metodo Select Cabeceras
        public ConcurrentBag<Compra> ListarCompras(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Compra>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Compra()
                {
                    //idCabeceraCompra = int.Parse(dr["idCabeceraCompra"].ToString().ToUpper()),
                    numeroFacturaCC = dr["numeroFactura"].ToString().ToUpper(),
                    fechaCompraCC = dr["fechaCompra"].ToString().ToUpper(),
                    idProveedorCC = int.Parse(dr["idProveedor"].ToString().ToUpper()),
                    nombreProveedorCC = dr["nombre"].ToString().ToUpper(),

                    rucProveedorCC = dr["ruc"].ToString().ToUpper(),
                    direccionProveedorCC = dr["direccion"].ToString().ToUpper(),
                    telefonoProveedorCC = dr["telefono"].ToString().ToUpper(),
                    emailProveedorCC = dr["email"].ToString().ToUpper(),

                    subTotalCC = dr["subTotal"].ToString().ToUpper(),
                    iva0CC = dr["iva0"].ToString().ToUpper(),
                    iva12CC = dr["iva12"].ToString().ToUpper(),
                    totalCC = dr["total"].ToString().ToUpper(),

                    //numeroFacturaDC = dr["numeroFactura"].ToString().ToUpper(),
                    //codigoProdcutoDC = dr["codigoProdcuto"].ToString().ToUpper(),
                    //cantidadDC = dr["cantidad"].ToString().ToUpper(),
                    //precioDC = dr["precio"].ToString().ToUpper(),

                });
            });

            return lista;
        }

        //Metodo Select Cabecera y Detalle
        public ConcurrentBag<Compra> CargarCompra(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Compra>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Compra()
                {
                    //idCabeceraCompra = int.Parse(dr["idCabeceraCompra"].ToString().ToUpper()),
                    numeroFacturaCC = dr["numeroFactura"].ToString().ToUpper(),
                    fechaCompraCC = dr["fechaCompra"].ToString().ToUpper(),
                    idProveedorCC = int.Parse(dr["idProveedor"].ToString().ToUpper()),
                    nombreProveedorCC = dr["nombre"].ToString().ToUpper(),

                    rucProveedorCC = dr["ruc"].ToString().ToUpper(),
                    direccionProveedorCC = dr["direccion"].ToString().ToUpper(),
                    telefonoProveedorCC = dr["telefono"].ToString().ToUpper(),
                    emailProveedorCC = dr["email"].ToString().ToUpper(),

                    subTotalCC = dr["subTotal"].ToString().ToUpper(),
                    iva0CC = dr["iva0"].ToString().ToUpper(),
                    iva12CC = dr["iva12"].ToString().ToUpper(),
                    totalCC = dr["total"].ToString().ToUpper(),

                    numeroFacturaDC = dr["numeroFactura"].ToString().ToUpper(),
                    codigoProdcutoDC = dr["codigoProdcuto"].ToString().ToUpper(),
                    iva = dr["iva"].ToString().ToUpper(),
                    cantidadDC = dr["cantidad"].ToString().ToUpper(),
                    precioDC = dr["precio"].ToString().ToUpper(),
                    descripcion = dr["descripcion"].ToString()

                });
            });

            return lista;
        }
        //Metodo Insert
        public string BDCon(string consulta)
        {
            SqlConnection cnn = new SqlConnection(conexion.cadena);

            string sql = consulta;

            cnn.Open();

            SqlCommand command = new SqlCommand(sql, cnn);
            command.ExecuteNonQuery();

            cnn.Close();

            return "END";
        }


    }
}