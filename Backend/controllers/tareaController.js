// Archivo: Backend/controllers/tarea.controller.js
import { AppDataSource } from '../data-source.js';
import { Tarea } from '../entities/Tarea.js';
import { TareaTablero } from '../entities/TareaTablero.js';
import { TareaUsuario } from '../entities/TareaUsuario.js';
import { Categoria } from '../entities/Categoria.js';
import { Estado } from '../entities/Estado.js';
import { Prioridad } from '../entities/Prioridad.js';
import { Usuario } from '../entities/Usuario.js';
import { Tablero } from '../entities/Tablero.js';

const tareaRepo = AppDataSource.getRepository(Tarea);
const tareaTableroRepo = AppDataSource.getRepository(TareaTablero);
const tareaUsuarioRepository = AppDataSource.getRepository(TareaUsuario);
const categoriaRepo = AppDataSource.getRepository(Categoria);
const estadoRepo = AppDataSource.getRepository(Estado);
const prioridadRepo = AppDataSource.getRepository(Prioridad);
const usuarioRepo = AppDataSource.getRepository(Usuario);
const tableroRepo = AppDataSource.getRepository(Tablero);

export const crearTarea = async (req, res) => {
    try {
        const {
            Titulo,
            Descripcion,
            FechaLimite,
            Contenido,
            Activo,
            CategoriaID,
            EstadoID,
            PrioridadID,
            UsuarioID,
            TableroID,
            colaboradores = [] // array opcional
        } = req.body;

        // Repositorios
        const categoria = await categoriaRepo.findOneBy({ CategoriaID });
        const estado = await estadoRepo.findOneBy({ EstadoID });
        const prioridad = await prioridadRepo.findOneBy({ PrioridadID });
        const usuario = await usuarioRepo.findOneBy({ UsuarioID });
        const tablero = await tableroRepo.findOneBy({ TableroID });

        if (!categoria || !estado || !prioridad || !usuario || !tablero)
            return res.status(400).json({ mensaje: 'Datos inválidos' });

        const nuevaTarea = tareaRepo.create({
            Titulo,
            Descripcion,
            FechaCreacion: new Date(),
            FechaLimite: new Date(FechaLimite),
            Contenido,
            Activo: Activo ?? true,
            Categoria: categoria,
            Estado: estado,
            Prioridad: prioridad,
            Usuario: usuario
        });

        const tareaGuardada = await tareaRepo.save(nuevaTarea);

        //Relación con Tablero
        //const relacionTablero = tareaTableroRepo.create({
        //    TareaID: tareaGuardada.TareaID, //TareaID: { TareaID: tareaGuardada.TareaID }, //tarea: tareaGuardada,
        //    TableroID: tablero.TableroID // TableroID: { tableroID } //tablero
        //});
        await tareaTableroRepo.insert({
            TareaID: tareaGuardada.TareaID,
            TableroID: tablero.TableroID
        });
        //await tareaTableroRepo.save(relacionTablero);

        // Relación con Usuarios colaboradores
        if (Array.isArray(colaboradores)) {
            for (const colaboradorID of colaboradores) {
                await tareaUsuarioRepository.save({
                    tarea: { TareaID: tareaGuardada.tareaID },
                    usuario: { UsuarioID: colaboradorID }
                });
            }
        }

        const io = req.app.get('io');
        io.to(`tablero_${TableroID}`).emit('nueva_tarea', tareaGuardada);

        res.status(201).json(tareaGuardada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear la tarea' });
    }
};


export async function listarTareasPorTablero(req, res) {
    try {
        const { tableroId } = req.params;

        // Obtener IDs de tareas relacionadas al tablero
        const relaciones = await tareaTableroRepo.find({
            where: { TableroID: parseInt(tableroId) }
        });

        const tareaIDs = relaciones.map(r => r.TareaID);

        // Buscar tareas y cargar relaciones
        const tareas = await tareaRepo.findByIds(tareaIDs, {
            relations: ["Categoria", "Estado", "Prioridad", "Usuario"]
        });

        res.json(tareas);
    } catch (err) {
        console.error("❌ Error al cargar tareas del tablero:", err);
        res.status(500).json({ mensaje: "Error al obtener tareas del tablero" });
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






// Prueba de inserción
export async function pruebaInsercion(req, res) {
    try {
        // Crear un tablero
        const tableroRepo = AppDataSource.getRepository(Tablero);
        const nuevoTablero = tableroRepo.create({ Nombre: 'Tablero Test', UsuarioID: 1 });
        const tableroGuardado = await tableroRepo.save(nuevoTablero);

        // Crear una tarea
        const tareaRepo = AppDataSource.getRepository(Tarea);
        const nuevaTarea = tareaRepo.create({
            Titulo: 'Tarea Test',
            FechaCreacion: new Date(),
            FechaLimite: new Date(),
            Contenido: 'Tarea Test',
            Activo: true,
            UsuarioID: 1,
            CategoriaID: 1,
            EstadoID: 1,
            PrioridadID: 1
        });
        const tareaGuardada = await tareaRepo.save(nuevaTarea);

        // Crear la relación en TareaTablero
        const tareaTableroRepo = AppDataSource.getRepository("TareaTablero");
        const relacion = tareaTableroRepo.create({
            TareaID: tareaGuardada.TareaID,
            TableroID: tableroGuardado.TableroID
        });
        await tareaTableroRepo.save(relacion);

        res.json({ tablero: tableroGuardado, tarea: tareaGuardada, relacion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}