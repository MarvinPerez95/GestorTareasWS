import { AppDataSource } from '../data-source.js'
import { Archivo } from '../entities/Archivo.js'

const repositorio = AppDataSource.getRepository(Archivo);

//CreateArchivo
export async function agregarArchivo(req, res) {
    try {
        const archivo = repositorio.create(req.body)
        const resultado = await repositorio.save(archivo)
        res.status(201).json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetAllArchivos
export async function obtenerArchivos(req, res) {
    try {
        const archivos = await repositorio.find()
        res.json(archivos)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneArchivo
export async function obtenerArchivo(req, res) {
    try {
        const archivo = await repositorio.findOneBy({ ArchivoID: parseInt(req.params.id) })
        if (!archivo) return res.status(404).json({ error: 'archivo no encontrado' })
        res.json(archivo)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//DeleteArchivo
export async function eliminarArchivo(req, res) {
    try {
        const archivo = await repositorio.findOneBy({ ArchivoID: parseInt(req.params.id) })
        if (!archivo) return res.status(404).json({ error: 'No Encontrado' })

        await repositorio.remove(archivo)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}