const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/departamentoController') //ctrl = controler

const auth = require('../middleware/auth')

//router.get('/', obtenerDepartamentos)
//router.post('/', auth, crearDepartamento)
//router.delete('/', auth, eliminarDepartamento)

router.get('/', ctrl.obtenerDepartamentos)
router.get('/:id', ctrl.obtenerDepartamento)
router.post('/', ctrl.crearDepartamento)
router.put('/:id', ctrl.actualizarDepartamento)
router.delete('/:id', ctrl.eliminarDepartamento)

module.exports = router