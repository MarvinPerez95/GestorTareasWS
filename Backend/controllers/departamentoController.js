import { AppDataSource } from '../data-source.js'
import { Departamento } from '../entities/Departamento.js'

const repositorio = AppDataSource.getRepository(Departamento);

//CreateDepartamento
export async function crearDepartamento(req, res) {
    try {
        const departamento = repositorio.create(req.body)
        const resultado = await repositorio.save(departamento)
        res.status(201).json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetAllDepartamentos
export async function obtenerDepartamentos(req, res) {
    try {
        const departamentos = await repositorio.find()
        res.json(departamentos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneDepartamento
export async function obtenerDepartamento(req, res) {
    try {
        const departamento = await repositorio.findOneBy({ DepartamentoID: parseInt(req.params.id) })
        if (!departamento) return res.status(404).json({ error: 'departamento no encontrado' })
        res.json(departamento)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//UpdateDepartamento
export async function actualizarDepartamento(req, res) {
    try {
        const departamento = await repositorio.findOneBy({ DepartamentoID: parseInt(req.params.id) })
        if (!departamento) return res.status(404).json({ error: 'No Encontrado' })
        repositorio.merge(departamento, req.body)
        const resultado = await repositorio.save(departamento)
        res.json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//DeleteDepartamento
export async function eliminarDepartamento(req, res) {
    try {
        const departamento = await repositorio.findOneBy({ DepartamentoID: parseInt(req.params.id) })
        if (!departamento) return res.status(404).json({ error: 'No Encontrado' })

        await repositorio.remove(departamento)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}