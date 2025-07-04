import { AppDataSource } from '../data-source.js'
import { Tablero } from '../entities/Tablero.js'
import { Departamento } from '../entities/Departamento.js'
import { Usuario } from '../entities/Usuario.js'

const tableroRepository = AppDataSource.getRepository(Tablero);
const departamentoRepository = AppDataSource.getRepository(Departamento);
const usuarioRepository = AppDataSource.getRepository(Usuario);

//CreateTablero
export async function crearTablero(req, res) {
    try {
        const { Nombre, Descripcion, UsuarioID } = req.body;

        const Usuario = await usuarioRepository.findOne({ where: { UsuarioID }, relations: ['Departamento'] });
        if (!Usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const nuevoTablero = tableroRepository.create({
            Nombre,
            Descripcion,
            FechaCreacion: new Date(),
            Usuario,
            Departamento: Usuario.Departamento
        });

        const resultado = await tableroRepository.save(nuevoTablero);

        const io = req.app.get('io');
        io.to(`departamento_${Usuario.DepartamentoID}`).emit('nuevo_tablero', resultado);

        res.status(201).json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el tablero' });
    }
};

//Lista de Tableros
export async function listarTableros(req, res) {
    const tableros = await tableroRepository.find({ relations: ["Departamento", "Usuario"] });
    res.json(tableros);
}

//GetAllTableros
export async function obtenerTableros(req, res) {
    try {
        const tableros = await tableroRepository.find()
        res.json(tableros)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneTablero
export async function obtenerTablero(req, res) {
    try {
        const tablero = await tableroRepository.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'tablero no encontrado' })
        res.json(tablero)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//UpdateTablero
export async function actualizarTablero(req, res) {
    try {
        const tablero = await tableroRepository.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'No encontrado' })
        tableroRepository.merge(tablero, req.body)
        const resultado = await tableroRepository.save(tablero)
        res.json(resultado)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//DeleteTablero
export async function eliminarTablero(req, res) {
    try {
        const tablero = await tableroRepository.findOneBy({ TableroID: parseInt(req.params.id) })
        if (!tablero) return res.status(404).json({ error: 'No Encontrado' })

        await tableroRepository.remove(tablero)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}