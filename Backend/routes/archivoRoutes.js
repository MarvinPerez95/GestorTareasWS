const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/archivoController') //ctrl = controler

const auth = require('../middleware/auth')

//router.get('/', obtenerArchivos)
//router.post('/', auth, crearArchivo)
//router.delete('/', auth, eliminarArchivo)

router.get('/', ctrl.obtenerArchivos)
router.get('/:id', ctrl.obtenerArchivo)
router.post('/', ctrl.agregarArchivo)
//router.put('/:id', ctrl.actualizarArchivo)
router.delete('/:id', ctrl.eliminarArchivo)

module.exports = router