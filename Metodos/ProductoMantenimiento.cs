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
    public class ProductoMantenimiento
    {

        Conexion conexion = new Conexion();

        //Metodo Select
        public ConcurrentBag<Producto> ListarProducto(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Producto>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Producto()
                {
                    idProducto = int.Parse(dr["idProducto"].ToString().ToUpper()),
                    codigo = dr["codigo"].ToString().ToUpper(),
                    descripcion = dr["descripcion"].ToString().ToUpper(),
                    medida = dr["medida"].ToString().ToUpper(),
                    valor = double.Parse(dr["valor"].ToString().ToUpper())
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

        //Metodo Select Producto para Factura
        public ConcurrentBag<Producto> ProductoSelect(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Producto>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Producto()
                {
                    codigo = dr["codigo"].ToString().ToUpper(),
                    descripcion = dr["descripcion"].ToString().ToUpper(),
                    medida = dr["medida"].ToString().ToUpper(),
                    valor = double.Parse(dr["valor"].ToString().ToUpper()),
                    stock = dr["stock"].ToString(),
                    iva = dr["iva"].ToString()
                });
            });

            return lista;
        }

    }
}