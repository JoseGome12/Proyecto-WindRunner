import { Router } from "express";
import {getLibros, agregarLibro, nuevoUsuario, getUsuario,getTusLibros} from '../controllers/usuarios.controller.js'


const router = Router()
// Consulta todos los libros que hay
router.get('/Libros', getLibros)
//Agregar un libro a tu lista
router.post('/AgregarLibro', agregarLibro);
//Agregar usuario
router.post("/NuevoUsuario", nuevoUsuario)


router.get('/verUsuarios/:usu/:contra', getUsuario)
router.get('/verTusLibros/:id',getTusLibros)
export default router