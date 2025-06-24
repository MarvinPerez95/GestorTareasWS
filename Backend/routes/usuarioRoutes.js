const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/usuarioController') //ctrl = controler

const auth = require('../middleware/auth')

//router.get('/', obtenerUsuarios)
//router.post('/', auth, crearUsuario)
//router.delete('/', auth, eliminarUsuario)

router.get('/', ctrl.obtenerUsuarios)
router.get('/:id', ctrl.obtenerUsuario)
router.post('/', ctrl.crearUsuario)
router.put('/:id', ctrl.actualizarUsuario)
router.delete('/:id', ctrl.eliminarUsuario)

module.exports = router