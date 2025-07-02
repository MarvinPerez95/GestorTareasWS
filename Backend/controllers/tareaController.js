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
            Titulo,
            Descripcion,
            FechaLimite,
            Contenido,
            Activo,
            CategoriaID,
            EstadoID,
            PrioridadID,
            UsuarioID,
            TableroID
        } = req.body;

        // Repositorios
        const categoria = await categoriaRepo.findOneBy({ CategoriaID });
        const estado = await estadoRepo.findOneBy({ EstadoID });
        const prioridad = await prioridadRepo.findOneBy({ PrioridadID });
        const usuario = await usuarioRepo.findOneBy({ UsuarioID });
        const tablero = await tableroRepo.findOneBy({ TableroID });

        // Validación de existencia de claves foráneas
        if (!categoria || !estado || !prioridad || !usuario || !tablero) {
            console.log(categoria, estado, prioridad, usuario, tablero)
            return res.status(400).json({ mensaje: 'Datos inválidos: categoría, estado, prioridad, usuario o tablero no existen.' });
        }

        // Crear la tarea
        const nuevaTarea = tareaRepository.create({
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

        const tareaGuardada = await tareaRepository.save(nuevaTarea);

        // Crear la relación en la tabla intermedia TareaTablero (usando solo IDs)
        // const relacion = tareaTableroRepository.create({
        //     TareaID: tareaGuardada.TareaID, // Usar el ID ya asignado por la base de datos
        //     TableroID: tablero.TableroID,
        // });

        // await tareaTableroRepository.save(relacion);

        // Emitir evento por WebSocket a los usuarios del tablero
        const io = req.app.get('io');
        io.to(`tablero_${TableroID}`).emit('nueva_tarea', tareaGuardada);

        return res.status(201).json(tareaGuardada);

    } catch (error) {
        console.error("❌ Error al crear la tarea:", error);
        return res.status(500).json({ mensaje: 'Error interno al crear la tarea' });
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