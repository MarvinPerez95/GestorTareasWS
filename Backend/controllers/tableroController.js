import { AppDataSource } from '../data-source.js'
import { Tablero } from '../entities/Tablero.js'
import { Departamento } from '../entities/Departamento.js'
import { Usuario } from '../entities/Usuario.js'

const tableroRepository = AppDataSource.getRepository(Tablero);
const departamentoRepository = AppDataSource.getRepository(Departamento);
const usuarioRepository = AppDataSource.getRepository(Usuario);
const repositorio = AppDataSource.getRepository(Tablero);

//CreateTablero
export async function crearTablero(req, res) {
    try {
        const { nombre, descripcion, UsuarioID } = req.body;

        const usuario = await usuarioRepository.findOne({ where: { UsuarioID }, relations: ['Departamento'] });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const nuevoTablero = tableroRepository.create({
            nombre,
            descripcion,
            fechaCreacion: new Date(),
            usuario,
            departamento: usuario.departamento
        });

        const resultado = await tableroRepository.save(nuevoTablero);

        const io = req.app.get('io');
        io.to(`departamento_${usuario.departamento.DepartamentoID}`).emit('nuevo_tablero', resultado);

        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el tablero' });
    }
};

//GetAllTableros
export async function obtenerTableros(req, res) {
    try {
        const tableros = await repositorio.find()
        res.json(tableros)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneTablero
export async function obtenerTablero(req, res) {
    try {
        const tablero = await repositorio.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'tablero no encontrado' })
        res.json(tablero)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//UpdateTablero
export async function actualizarTablero(req, res) {
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
export async function eliminarTablero(req, res) {
    try {
        const tablero = await repositorio.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'No Encontrado' })

        await repositorio.remove(tablero)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}