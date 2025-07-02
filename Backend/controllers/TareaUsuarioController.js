import { AppDataSource } from "../data-source.js";

const tareaRepo = AppDataSource.getRepository("Tarea");
const tareaUsuarioRepo = AppDataSource.getRepository("TareaUsuario");
const tableroRepo = AppDataSource.getRepository("Tablero");


export async function consultarTareasPorUsuario(req, res) {
    const { usuarioId } = req.params;

    try {
        // Tareas como responsable principal
        const tareasResponsable = await tareaRepo.find({
            where: { Usuario: { UsuarioID: parseInt(usuarioId) } },
            relations: ["Categoria", "Estado", "Prioridad"]
        });

        // Tareas como colaborador (TareaUsuario)
        const relaciones = await tareaUsuarioRepo.find({
            where: { UsuarioID: parseInt(usuarioId) }
        });

        const tareaIDsColaborador = relaciones.map(r => r.TareaID);

        const tareasColaborador = await tareaRepo.findByIds(tareaIDsColaborador, {
            relations: ["Categoria", "Estado", "Prioridad"]
        });

        // Combinar y evitar duplicados
        const todasLasTareas = [
            ...tareasResponsable,
            ...tareasColaborador.filter(
                tarea => !tareasResponsable.some(t => t.TareaID === tarea.TareaID)
            )
        ];

        res.json(todasLasTareas);
    } catch (error) {
        console.error("Error al consultar tareas:", error);
        res.status(500).json({ mensaje: "Error al obtener tareas del usuario" });
    }
}


export async function consultarTodosLosTableros(req, res) {
    try {
        const tableros = await tableroRepo.find({
            relations: ["Usuario", "Departamento"]
        });

        res.json(tableros);
    } catch (error) {
        console.error("❌ Error al consultar tableros:", error);
        res.status(500).json({ mensaje: "Error al obtener tableros" });
    }
}
