import obtenerDepartamentos from '..controllers/departamentoController'

function validarAccesoTablero(req, res, next) {
    const userDepId = req.user.DepartamentoID
    const { tableroDepId } = req.body
    if (userDepId !== tableroDepId) {
        return res.status(403).json({ mensaje: 'Acceso denegado al tablero' })
    }
    next()
}

