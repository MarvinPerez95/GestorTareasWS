const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/tareaController') //ctrl = controler

const auth = require('../middleware/auth')

//router.get('/', obtenerTareas)
//router.post('/', auth, crearTarea)
//router.delete('/', auth, eliminarTarea)

router.get('/', ctrl.obtenerTareas)
router.get('/:id', ctrl.obtenerTarea)
router.post('/', ctrl.crearTarea)
router.put('/:id', ctrl.actualizarTarea)
router.delete('/:id', ctrl.eliminarTarea)

module.exports = router