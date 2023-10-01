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
    public class FacturaMantenimiento
    {
        Conexion conexion = new Conexion();

        //Metodo Select
        public ConcurrentBag<Factura> ListarFacturas(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Factura>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Factura()
                {
                    codigoFacturaCF = dr["codigoFactura"].ToString().ToUpper(),

                    idClienteCF = int.Parse(dr["idCliente"].ToString().ToUpper()),
                    nombreClienteCF = dr["nombre"].ToString().ToUpper(),
                    apellidoClienteCF = dr["apellido"].ToString().ToUpper(),
                    cedulaClienteCF = dr["cedula"].ToString().ToUpper(),
                    telefonoClienteCF = dr["telefono"].ToString().ToUpper(),

                    fechaEmisionCF = dr["fechaEmision"].ToString().ToUpper(),

                    idUsuarioCF = int.Parse(dr["idUsuario"].ToString().ToUpper()),
                    nombreUsuarioCF = dr["nombre"].ToString().ToUpper(),
                    apellidoUsuarioCF = dr["apellido"].ToString().ToUpper(),
                    rolUsuarioCF = dr["rol"].ToString().ToUpper(),

                    subTotalCF = dr["subTotal"].ToString().ToUpper(),
                    iva0CF = dr["iva0"].ToString().ToUpper(),
                    iva12CF = dr["iva12"].ToString().ToUpper(),
                    totalCF = dr["total"].ToString().ToUpper(),

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