using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using FarmaVenta.Metodos;
using FarmaVenta.Models;

namespace FarmaVenta.Metodos
{
    public class UsuarioMantenimiento
    {

        Conexion conexion = new Conexion();

        //Metodo Select
        public ConcurrentBag<Usuario> ListarUsuario(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Usuario>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Usuario()
                {
                    idUsuario = int.Parse(dr["idUsuario"].ToString().ToUpper()),
                    nombre = dr["nombre"].ToString().ToUpper(),
                    apellido = dr["apellido"].ToString().ToUpper(),
                    rol = dr["rol"].ToString().ToUpper(),
                    contraseña = dr["contraseña"].ToString().ToUpper(),
                    cedula = dr["cedula"].ToString().ToUpper(),
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