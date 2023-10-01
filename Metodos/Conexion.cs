using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FarmaVenta.Models;

namespace FarmaVenta.Metodos
{
    public class Conexion
    {

        
        public string cadena = "Data Source=MSI\\SQLEXPRESS;Initial Catalog=FarmaVenta;Persist Security Info=True;User ID=sa;Password=123456789";


        public DataTable BD(string consulta)
        {
            DataTable dt = new DataTable();

            SqlConnection cnn = new SqlConnection(cadena);

            String sql = consulta;

            cnn.Open();

            SqlCommand command = new SqlCommand(sql, cnn);
            SqlDataAdapter tabla = new SqlDataAdapter(command);
            tabla.Fill(dt);

            cnn.Close();

            return dt;
        }

        public string BDCon(string consulta)
        {
            SqlConnection cnn = new SqlConnection(cadena);

            string sql = consulta;

            cnn.Open();

            SqlCommand command = new SqlCommand(sql, cnn);
            command.ExecuteNonQuery();

            cnn.Close();

            return "ok";
        }

    }
}