import { json } from 'express';
import {getConnection, sql} from '../database/connection.js'
import { VarChar } from 'mssql';
var basicAuth = require('basic-auth');
export const getLibros = async (req, res) => {

    // Llama la conexion y el pool
    const pool = await getConnection();
    //Con el pool hace la consulta
    const resul = await pool.request().query("Select idLibro,NombreLibro,Autor,Genero,FechaPublicacion from Libros")
    console.log(resul)
    res.json(resul.recordset)

};

export const agregarLibro = async (req,res) => {
    const { idUsuario, idLibro} = req.body
    console.log(idUsuario, idLibro)

    //Agrega base de datos
    const pool = await getConnection();

    await pool.request().input("idUsuario",sql.Int,idUsuario)
    .input("idLibro",sql.Int,idLibro)
    .query("INSERT INTO Prestamos (idUsuario, idLibro) VALUES (@idUsuario, @idLibro)")

    res.json("Libro Agregado")
};

export const nuevoUsuario = async (req,res) => {
    const { usuario, contraseña } = req.body
    console.log(usuario,contraseña)

    const pool = await getConnection();
    await pool.request().input("Usuario",VarChar,usuario)
    .input("contraseña",VarChar,contraseña)
    .query("INSERT INTO Usuarios (Usuario, Contraseña) VALUES (@Usuario, @Contraseña)")

    res.json("Usuario agregado")

}






export const getTusLibros = async(req,res)=>{
   const {id} =req.params;
   const pool = await getConnection();
   const resul = await pool
  .request()
  .input('idUsuario',sql.Int,id)
  .execute('verTusLibros')
  console.log(resul)
   res.send(resul.recordset)
}

export const getUsuario = async (req, res) => {
  const { usu, contra } = req.params;
  const pool = await getConnection();

  try {
    const resul = await pool
      .request()
      .input('Usuario', sql.VarChar, usu)
      .input('Contraseña', sql.VarChar, contra)
      .execute('VerUsuarios');

    if (resul.recordset.length > 0) {
      const idUsuario = resul.recordset[0].idUsuario;
      res.send({ existe: true, idUsuario });
    } else {
      res.send({ existe: false });
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.status(500).send({ error: 'Error de servidor' });
  }
};