const { AppDataSource } = require('../data-source')
const { Tablero } = require('../entities/Tablero')

const repositorio = AppDataSource.getRepository(Tablero);

//CreateTablero
async function crearTablero(req, res) {
    try {
        const tablero = repositorio.create(req.body)
        const resultado = await repositorio.save(tablero)
        res.status(201).json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetAllTableros
async function obtenerTableros(req, res) {
    try {
        const tableros = await repositorio.find()
        res.json(tableros)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneTablero
async function obtenerTablero(req, res) {
    try {
        const tablero = await repositorio.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'tablero no encontrado' })
        res.json(tablero)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//UpdateTablero
async function actualizarTablero(req, res) {
    try {
        const tablero = await repositorio.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'No encontrado' })
        repositorio.merge(tablero, req.body)
        const resultado = await repositorio.save(tablero)
        res.json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//DeleteUser
async function eliminarTablero(req, res) {
    try {
        const tablero = await repositorio.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'No Encontrado' })

        await repositorio.remove(tablero)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    crearTablero,
    obtenerTablero,
    obtenerTableros,
    actualizarTablero,
    eliminarTablero
}