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
    public class ProveedorMantenimiento
    {

        Conexion conexion = new Conexion();

        //Metodo Select
        public ConcurrentBag<Proveedor> ListarProveedor(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Proveedor>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Proveedor()
                {
                    idProveedor = int.Parse(dr["idProveedor"].ToString().ToUpper()),
                    ruc = dr["ruc"].ToString().ToUpper(),
                    nombre = dr["nombre"].ToString().ToUpper(),
                    telefono = dr["telefono"].ToString().ToUpper(),
                    direccion = dr["direccion"].ToString().ToUpper(),
                    email = dr["email"].ToString().ToUpper(),
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