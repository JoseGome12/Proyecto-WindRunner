import { json } from 'express';
import {getConnection, sql} from '../database/connection.js'
import { VarChar, pool } from 'mssql';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
var basicAuth = require('basic-auth');
export const getSoftware = async (req, res) => {

    // Llama la conexion y el pool
    const pool = await getConnection();
    //Con el pool hace la consulta
    const resul = await pool.request().query("Select * from Software_Venta")
    console.log(resul)
    res.json(resul.recordset)

};

export const agregarCarrito = async (req,res) => {
    const { idUsuario, idSoftware,Precio} = req.body
    console.log(idUsuario, idSoftware,Precio)

    //Agrega base de datos
    const pool = await getConnection();

    await pool.request().input("idUsuario",sql.Int,idUsuario)
    .input("idSoftware",sql.Int,idSoftware)
    .input("Precio",sql.Int,Precio)
    .query("INSERT INTO Carrito (idUsuario, idSoftware,Precio,EstadoCompra) VALUES (@idUsuario, @idSoftware,@Precio,0)")

    res.json("articulo Agregado")
};

export const nuevoUsuario = async (req,res) => {
    const { cedula,usuario, contraseña, Correo, Telefono, Ubicacion} = req.body
    console.log(usuario,contraseña, Correo, Telefono, Ubicacion)
    const bcrypt = require('bcrypt');
    
    bcrypt.hash(contraseña, 10, async (err, hash) => {
      if (err) {
        console.error('Error al encriptar la contraseña:', err);
        res.status(500).json('Error al encriptar la contraseña');
        return;
      }
    else{
      const pool = await getConnection();
      await pool.request().input("cedula",VarChar,cedula)
      .input("Usuario",VarChar,usuario)
      .input("contraseña",VarChar,hash)
      .input("correo",Correo)
      .input("telefono",Telefono)
      .input("ubicacion",Ubicacion)
      .query("INSERT INTO Usuarios (cedula,Usuario, Contraseña,Correo,Telefono,Ubicación,Estado) VALUES (@cedula,@Usuario, @Contraseña,@correo,@telefono,@ubicacion,1)")
  
      res.json("Usuario agregado")
    }});


}

export const cambiarContraseña = async (req,res) => {
  const { correo, contra } = req.body;
  console.log(correo,contra)
  
  bcrypt.hash(contra, 10, async (err, hash) => {
    if (err) {
      console.error('Error al encriptar la contraseña:', err);
      res.status(500).json('Error al encriptar la contraseña');
      return;
    }
  else{
    const pool = await getConnection();
    await pool.request().input("correo",VarChar,correo)
    .input("NuevaContraseña",VarChar,hash)
    .execute("CambiarContraseña")

    res.json("contraseña cambiada con exito")
  }});


}


export const getTuCarrito = async(req,res)=>{
   const {id} =req.params;
   const pool = await getConnection();
   const resul = await pool
  .request()
  .input('idUsuario',sql.Int,id)
  .execute('MostrarCarritoUsuario')
  console.log(resul)
   res.send(resul.recordset)
}

export const getProductoId = async(req,res)=>{
  const {id} =req.params;
  const pool = await getConnection();
  const resul = await pool
 .request()
 .input('IdSoftware',sql.Int,id)
 .query('select * from Software_Venta where IdSoftware = @IdSoftware')
 console.log(resul)
  res.send(resul.recordset)
}

export const getUsuario = async (req, res) => {

  let { usu,contra  } = req.params;
  const pool = await getConnection();

  try {
    const resul = await pool
      .request()
      .input('Usuario', sql.VarChar, usu)
      .execute('VerUsuarios');

    if (resul.recordset.length > 0) {
      let idUsuario = resul.recordset[0].idUsuario;
      const hash = resul.recordset[0].Contraseña;
      //res.send({ existe: true, idUsuario });

      bcrypt.compare(contra, hash, (err, contrasenaCorrecta) => {
        if (err) {
          console.error('Error al comparar contraseñas:', err);
          res.status(500).send({ error: 'Error de servidor' });
        } else if (contrasenaCorrecta) {
          res.send({ existe: true, idUsuario });
        } else {
          res.send({ existe: false });
        }
      });

    } else {
      res.send({ existe: false });
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.send({ existe: false });
  }
};

export const eliminarCarrito = async(req,res)=>{
  const {id} =req.params;
  console.log(id)
  const pool = await getConnection();
  const resul = await pool
 .request()
 .input('idCarrito',sql.Int,id)
 .query('DELETE FROM Carrito WHERE idCarrito = @idCarrito')
 console.log(resul)
  res.send('Eliminado con exito')
}
export const comprarCarrito = async(req,res)=>{
  const {id} =req.params;
  console.log(id)
  const pool = await getConnection();
  const resul = await pool
 .request()
 .input('idUsuario',sql.Int,id)
 .query('UPDATE Carrito SET EstadoCompra = 1 WHERE idUsuario = @idUsuario');
 console.log(resul)
  res.send('Compra exitosa con exito')
}

export const EnviarToken = async(req,res)=>{
  const {correo} = req.params;

  const tokenAleatorio = generarToken();
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "josejuliangomez49@gmail.com",
      pass: "ecbj xnjx rqky qoai"
    }
    
  });
  const mailOptions = {
    from: "josejuliangomez49@gmail.com",
    to: correo,
    subject: "Recuperación contraseña",
    text: "El token de recuperación de contraseña es: " + tokenAleatorio +"."
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo electrónico: " + error);
    } else {
      console.log("Correo electrónico enviado: " + info.response);
    }
  });
  const pool = await getConnection();
      await pool.request().input("correo",VarChar,correo)
      .input("token",VarChar,tokenAleatorio)
      .query("INSERT INTO RecuperarCuenta (correo,token) values(@correo,@token)")
      console.log(correo,tokenAleatorio)
      res.json('Token enviado al correo: '+ correo)
}

export const comprobarToken = async (req, res) => {

  let { correo,token  } = req.params;
  const pool = await getConnection();
  try {
    const resul = await pool
      .request()
      .input('correo', sql.VarChar, correo)
      .input('token',VarChar,token)
      .execute('SPRecuperarCuenta');
    if (resul.recordset.length > 0) {
      let TOKEN = resul.recordset[0].token;
      console.log(TOKEN)
      if (TOKEN == token){
        res.json({ existe: true});
        console.log("Elemento enviado")

      }


    } else {
      res.send({ existe: false });
    }
  } catch (error) {
    console.error('Error al ejecutar la consulta:', error);
    res.send({ existe: false });
  }
};



function generarToken() {
  const caracteres = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const longitudToken = 5;
  let token = "";

  for (let i = 0; i < longitudToken; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    token += caracteres.charAt(indiceAleatorio);
  }

  return token;
}
export const getProvincia = async (req, res) => {

  // Llama la conexion y el pool
  const pool = await getConnection();
  //Con el pool hace la consulta
  const resul = await pool.request().query("Select * from Ubicacion where tipo = 1 and padre = -1")
  console.log(resul)
  res.json(resul.recordset)

};

export const getCanton = async (req, res) => {

  const {idProvincia} =req.params;
  console.log(idProvincia)
  const pool = await getConnection();
  const resul = await pool
 .request()
 .input('idprovincia',sql.Int,idProvincia)
 .query('Select * from Ubicacion where tipo = 2 and Padre = @idprovincia')
 console.log(resul)
  res.send(resul.recordset)

};
export const getDistrito = async (req, res) => {

  const {idDistrito} =req.params;
  console.log(idDistrito)
  const pool = await getConnection();
  const resul = await pool
 .request()
 .input('idDistrito',sql.Int,idDistrito)
 .query('Select * from Ubicacion where tipo = 3 and Padre = @idDistrito')
 console.log(resul)
  res.send(resul.recordset)

};

export const verUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Usuarios WHERE idUsuario = @id');

    console.log(result);

    // Verifica si hay registros en el conjunto de registros antes de enviar la respuesta
    if (result.recordset && result.recordset.length > 0) {
      res.json(result.recordset);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export const ActualizarCuenta = async(req,res)=>{
  const {id,cedula,usuario,correo,telefono} =req.body;
  const pool = await getConnection();
  const resul = await pool
  .request()
  .input('idUsuario',sql.Int,id)
  .input('NuevoCedula',cedula)
  .input('NuevoUsuario',usuario)
  .input('NuevoCorreo',correo)
  .input('NuevoTelefono',telefono)
  .execute('ModificarUsuario')
  console.log(resul)
  res.send('modificado con exito')
}

