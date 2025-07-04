import express from 'express'
const router = express.Router()
import * as ctrl from '../controllers/departamentoController.js'
//import auth from '../middleware/auth.js'

//router.get('/', ctrl.obtenerDepartamentos)
//router.post('/', auth, ctrl.crearDepartamento)
//router.delete('/', auth, ctrl.eliminarDepartamento)

router.get('/', ctrl.obtenerDepartamentos)
router.get('/:id', ctrl.obtenerDepartamento)
router.post('/', ctrl.crearDepartamento)
router.put('/:id', ctrl.actualizarDepartamento)
router.delete('/:id', ctrl.eliminarDepartamento)

export default router