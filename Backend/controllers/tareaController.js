import { AppDataSource } from '../data-source.js';
import { Tarea } from '../entities/Tarea.js';
import { TareaTablero } from '../entities/TareaTablero.js';
import { Categoria } from '../entities/Categoria.js';
import { Estado } from '../entities/Estado.js';
import { Prioridad } from '../entities/Prioridad.js';
import { Usuario } from '../entities/Usuario.js';
import { Tablero } from '../entities/Tablero.js';

const tareaRepository = AppDataSource.getRepository(Tarea);
const tareaTableroRepository = AppDataSource.getRepository(TareaTablero);
const categoriaRepo = AppDataSource.getRepository(Categoria);
const estadoRepo = AppDataSource.getRepository(Estado);
const prioridadRepo = AppDataSource.getRepository(Prioridad);
const usuarioRepo = AppDataSource.getRepository(Usuario);
const tableroRepo = AppDataSource.getRepository(Tablero);
const repositorio = AppDataSource.getRepository(Tarea);

//CreateTarea
export async function crearTarea(req, res) {
    try {
        const {
            titulo, descripcion, fechaLimite, contenido, activo,
            CategoriaID, EstadoID, PrioridadID, UsuarioID, TableroID
        } = req.body;

        const [categoria, estado, prioridad, usuario, tablero] = await Promise.all([
            categoriaRepo.findOneBy({ CategoriaID }),
            estadoRepo.findOneBy({ EstadoID }),
            prioridadRepo.findOneBy({ PrioridadID }),
            usuarioRepo.findOneBy({ UsuarioID }),
            tableroRepo.findOneBy({ TableroID })
        ]);

        if (!categoria || !estado || !prioridad || !usuario || !tablero)
            return res.status(400).json({ mensaje: 'Datos inválidos' });

        const nuevaTarea = tareaRepository.create({
            titulo,
            descripcion,
            fechaCreacion: new Date(),
            fechaLimite: new Date(fechaLimite),
            contenido,
            activo,
            categoria,
            estado,
            prioridad,
            usuario
        });

        const tareaGuardada = await tareaRepository.save(nuevaTarea);

        const relacion = tareaTableroRepository.create({ tarea: tareaGuardada, tablero });
        await tareaTableroRepository.save(relacion);

        const io = req.app.get('io');
        io.to(`tablero_${tableroID}`).emit('nueva_tarea', tareaGuardada);

        res.status(201).json(tareaGuardada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la tarea' });
    }
}

//GetAllTareas
export async function obtenerTareas(req, res) {
    try {
        const tareas = await repositorio.find()
        res.json(tareas)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//GetOneTarea
export async function obtenerTarea(req, res) {
    try {
        const tarea = await repositorio.findOneBy({ TareaID: parseInt(req.params.id) })
        if (!tarea) return res.status(404).json({ error: 'tarea no encontrado' })
        res.json(tarea)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//UpdateTarea
export async function actualizarTarea(req, res) {
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

//DeleteTarea
export async function eliminarTarea(req, res) {
    try {
        const tarea = await repositorio.findOneBy({ TareaID: parseInt(req.params.id) })
        if (!tarea) return res.status(404).json({ error: 'No Encontrado' })

        await repositorio.remove(tarea)
        res.json({ mensaje: 'Eliminado Correctamente' })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}