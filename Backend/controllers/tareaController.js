const { AppDataSource } = require('../data-source')
const { Tarea } = require('../entities/Tarea')

const repositorio = AppDataSource.getRepository(Tarea);

//CreateTarea
async function crearTarea(req, res) {
    try {
        const tarea = repositorio.create(req.body)
        const resultado = await repositorio.save(tarea)
        res.status(201).json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetAllTareas
async function obtenerTareas(req, res) {
    try {
        const tareas = await repositorio.find()
        res.json(tareas)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneTarea
async function obtenerTarea(req, res) {
    try {
        const tarea = await repositorio.findOneBy({ TareaID: parseInt(req.params.id) })
        if (!tarea) return res.status(404).json({ error: 'tarea no encontrado' })
        res.json(tarea)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//UpdateTarea
async function actualizarTarea(req, res) {
    try {
        const tarea = await repositorio.findOneBy({ TareaID: parseInt(req.params.id) })
        if (!tarea) return res.status(404).json({ error: 'No encontrado' })
        repositorio.merge(tarea, req.body)
        const resultado = await repositorio.save(tarea)
        res.json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//DeleteUser
async function eliminarTarea(req, res) {
    try {
        const tarea = await repositorio.findOneBy({ TareaID: parseInt(req.params.id) })
        if (!tarea) return res.status(404).json({ error: 'No Encontrado' })

        await repositorio.remove(tarea)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    crearTarea,
    obtenerTarea,
    obtenerTareas,
    actualizarTarea,
    eliminarTarea
}