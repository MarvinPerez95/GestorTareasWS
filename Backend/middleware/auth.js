require('dotenv').config()

export function auth(req, res, next) {
    const { usuario, clave } = req.headers

    if (usuario === process.env.admin_user && clave === process.env.admin_pass) {
        return next()
    }
    return res.status(401).json({ error: 'No esta autorizado' })
}
