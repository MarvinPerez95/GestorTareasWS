const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/usuarioController')

router.get('/', ctrl.obtenerUsuarios)
router.get('/:id', ctrl.obtenerUsuario)
router.post('/', ctrl.crearUsuario)
router.put('/:id', ctrl.actualizarUsuario)
router.delete('/:id', ctrl.eliminarUsuario)

module.exports = router