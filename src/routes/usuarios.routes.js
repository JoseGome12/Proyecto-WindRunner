import { Router } from "express";
import {ActualizarCuenta,verUsuario,getDistrito,getCanton,getProvincia,comprobarToken,EnviarToken,getSoftware, agregarCarrito, nuevoUsuario, getUsuario,getTuCarrito, eliminarCarrito,comprarCarrito, getProductoId,cambiarContraseña} from '../controllers/usuarios.controller.js'

const router = Router()
// Consulta todos los libros que hay
router.get('/Software', getSoftware)
router.get('/SoftwareID/:id',getProductoId)
//Agregar un libro a tu lista
router.post('/agregarCarrito', agregarCarrito);
//Agregar usuario
router.post("/NuevoUsuario", nuevoUsuario)
router.put("/CambiarContrasenna",cambiarContraseña)

router.get('/verUsuarios/:usu/:contra', getUsuario)
router.get('/verTuCarrito/:id',getTuCarrito)

router.delete('/EliminarCarrito/:id',eliminarCarrito)
router.put('/HacerComprar/:id',comprarCarrito)

router.post('/EnviarToken/:correo',EnviarToken)
router.get('/ComprobarToken/:correo/:token',comprobarToken)

router.get('/GetProvincia',getProvincia)
router.get('/GetCanton/:idProvincia',getCanton)
router.get('/GetDistrito/:idDistrito',getDistrito)
router.get('/verUsuario/:id',verUsuario)
router.put('/Actualizar',ActualizarCuenta)
export default router