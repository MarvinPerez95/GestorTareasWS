import { AppDataSource } from "../Backend/data-source.js";

const tareaRepo = AppDataSource.getRepository("Tarea");
const categoriaRepo = AppDataSource.getRepository("Categoria");
const estadoRepo = AppDataSource.getRepository("Estado");
const prioridadRepo = AppDataSource.getRepository("Prioridad");
const usuarioRepo = AppDataSource.getRepository("Usuario");
const tareaUsuarioRepo = AppDataSource.getRepository("TareaUsuario");

async function insertarTareaConColaboradores() {
    try {
        await AppDataSource.initialize();

        // Obtener datos relacionados
        const categoria = await categoriaRepo.findOneBy({ CategoriaID: 1 });
        const estado = await estadoRepo.findOneBy({ EstadoID: 1 });
        const prioridad = await prioridadRepo.findOneBy({ PrioridadID: 1 });

        // Usuarios existentes (mínimo 2)
        const colaboradores = await usuarioRepo.find({ take: 2 });
        if (colaboradores.length < 2) {
            throw new Error("Se requieren al menos 2 usuarios en la base de datos.");
        }

        // Crear tarea
        const nuevaTarea = tareaRepo.create({
            Titulo: "Colaboración múltiple",
            Descripcion: "Tarea compartida entre varios usuarios",
            FechaCreacion: new Date(),
            FechaLimite: new Date(Date.now() + 3 * 86400000),
            Contenido: "Documentación conjunta",
            Activo: true,
            Categoria: categoria,
            Estado: estado,
            Prioridad: prioridad,
            Usuario: colaboradores[0] // Responsable principal
        });

        const tareaGuardada = await tareaRepo.save(nuevaTarea);
        console.log("✅ Tarea creada:", tareaGuardada.TareaID);

        // Relacionar con otros colaboradores
        const relaciones = colaboradores.map(user => ({
            TareaID: tareaGuardada.TareaID,
            UsuarioID: user.UsuarioID
        }));

        await tareaUsuarioRepo.save(relaciones);
        console.log("✅ Colaboradores asignados a la tarea.");

        await AppDataSource.destroy();
    } catch (error) {
        console.error("❌ Error:", error.message || error);
    }
}

insertarTareaConColaboradores();
