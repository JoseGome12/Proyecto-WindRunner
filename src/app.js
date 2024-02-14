import express from 'express'
import config from './config'
import usuarioRoutes from './routes/usuarios.routes.js'
import cors from "cors"; 
const app = express()

let port =
//configuracion del puerto
app.set('port',  config.port)


app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

app.use(usuarioRoutes)
export default app

