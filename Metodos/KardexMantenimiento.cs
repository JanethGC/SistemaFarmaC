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
    public class KardexMantenimiento
    {

        Conexion conexion = new Conexion();

        //Metodo Select
        public ConcurrentBag<Kardex> CargarKardex(string consulta)
        {

            DataTable dt = conexion.BD(consulta);

            var lista = new ConcurrentBag<Kardex>();

            Parallel.ForEach(dt.AsEnumerable(), (dr) =>
            {
                lista.Add(new Kardex()
                {
                    fecha = dr["fecha"].ToString().ToUpper(),
                    tipo = dr["tipo"].ToString().ToUpper(),
                    proveedor = dr["proveedor"].ToString().ToUpper(),
                    cliente = dr["cliente"].ToString().ToUpper(),
                    cantidadCompra = dr["cantidadCompra"].ToString().ToUpper(),
                    cantidadVenta = dr["cantidadVenta"].ToString().ToUpper(),
                    precioCompra = dr["precioCompra"].ToString().ToUpper(),
                    precioVenta = dr["precioVenta"].ToString().ToUpper(),
                    saldo = dr["saldo"].ToString().ToUpper()

                });
            });

            return lista;
        }
    }

}