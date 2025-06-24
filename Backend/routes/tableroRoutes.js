const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/tableroController') //ctrl = controler

const auth = require('../middleware/auth')

//router.get('/', obtenerTareas)
//router.post('/', auth, crearTarea)
//router.delete('/', auth, eliminarTarea)

router.get('/', ctrl.obtenerTableros)
router.get('/:id', ctrl.obtenerTablero)
router.post('/', ctrl.crearTablero)
router.put('/:id', ctrl.actualizarTablero)
router.delete('/:id', ctrl.eliminarTablero)

module.exports = router