import express from 'express'
const router = express.Router()
import * as ctrl from '../controllers/tableroController.js'
import * as ctrlt from '../controllers/tareaController.js'

//router.get('/', obtenerTareas)
//router.post('/', auth, crearTarea)
//router.delete('/', auth, eliminarTarea)

//router.get('/', ctrl.obtenerTableros)
router.get('/', ctrl.listarTableros)
router.get('/:id', ctrl.obtenerTablero)
router.post('/', ctrl.crearTablero)
router.put('/:id', ctrl.actualizarTablero)
router.delete('/:id', ctrl.eliminarTablero)
router.get('/:id/tareas', ctrlt.listarTareasPorTablero);
export default router