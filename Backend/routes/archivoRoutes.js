import express from 'express'
const router = express.Router()
import * as ctrl from '../controllers/archivoController.js'
//import auth from '../middleware/auth.js'

//router.get('/', ctrl.obtenerArchivos)
//router.post('/', auth, ctrl.crearArchivo)
//router.delete('/', auth, ctrl.eliminarArchivo)

router.get('/', ctrl.obtenerArchivos)
router.get('/:id', ctrl.obtenerArchivo)
router.post('/', ctrl.agregarArchivo)
//router.put('/:id', ctrl.actualizarArchivo)
router.delete('/:id', ctrl.eliminarArchivo)

export default router