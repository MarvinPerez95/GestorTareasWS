import express from 'express'
const router = express.Router()
import * as ctrl from '../controllers/usuarioController.js'
import auth from '../middleware/auth.js'

//router.get('/', ctrl.obtenerUsuarios)
//router.post('/', auth, ctrl.crearUsuario)
//router.delete('/', auth, ctrl.eliminarUsuario)

router.get('/', ctrl.obtenerUsuarios)
router.get('/:id', ctrl.obtenerUsuario)
router.post('/', ctrl.crearUsuario)
router.put('/:id', ctrl.actualizarUsuario)
router.delete('/:id', ctrl.eliminarUsuario)

export default router