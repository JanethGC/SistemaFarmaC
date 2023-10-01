using FarmaVenta.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace FarmaVenta.Metodos
{
    public class CierreCajaMantenimiento
    {
        Conexion conexion = new Conexion();

        //Metodo Select
        public ConcurrentBag<CierreCaja> CargarCierreCaja(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<CierreCaja>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new CierreCaja()
                {
                    hora = dr["hora"].ToString().ToUpper(),
                    numeroFactura= dr["numeroFactura"].ToString().ToUpper(),
                    cliente = dr["cliente"].ToString().ToUpper(),
                    totalVendido = dr["totalVendido"].ToString().ToUpper()
                });
            });

            return lista;
        }
    }
}