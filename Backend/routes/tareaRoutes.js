import express from 'express'
const router = express.Router()
import * as ctrl from '../controllers/tareaController.js'

//import auth from '../middleware/auth.js'

//router.get('/', ctrl.obtenerTareas)
//router.post('/', auth, ctrl.crearTarea)
//router.delete('/', auth, ctrl.eliminarTarea)

router.get('/', ctrl.obtenerTareas)
router.get('/:id', ctrl.obtenerTarea)
router.post('/', ctrl.crearTarea)
router.put('/:id', ctrl.actualizarTarea)
router.delete('/:id', ctrl.eliminarTarea)


// Ruta de prueba para inserción en Tablero, Tarea y TareaTablero
router.post('/test', ctrl.pruebaInsercion)

export default router