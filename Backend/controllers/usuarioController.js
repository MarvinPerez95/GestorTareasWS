import { AppDataSource } from '../data-source.js'
import { Usuario } from '../entities/Usuario.js'

const repositorio = AppDataSource.getRepository(Usuario);

//CreateUser
export async function crearUsuario(req, res) {
    try {
        const usuario = repositorio.create(req.body)
        const resultado = await repositorio.save(usuario)
        res.status(201).json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetAllUsers
export async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await repositorio.find()
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneUser
export async function obtenerUsuario(req, res) {
    try {
        const usuario = await repositorio.findOneBy({ UsuarioID: parseInt(req.params.id) })
        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json(usuario)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//UpdateUser
export async function actualizarUsuario(req, res) {
    try {
        const usuario = await repositorio.findOneBy({ UsuarioID: parseInt(req.params.id) })
        if (!usuario) return res.status(404).json({ error: 'No Encontrado' })
        repositorio.merge(usuario, req.body)
        const resultado = await repositorio.save(usuario)
        res.json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//DeleteUser
export async function eliminarUsuario(req, res) {
    try {
        const usuario = await repositorio.findOneBy({ UsuarioID: parseInt(req.params.id) })
        if (!usuario) return res.status(404).json({ error: 'No Encontrado' })

        await repositorio.remove(usuario)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}