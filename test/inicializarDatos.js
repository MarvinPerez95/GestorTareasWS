import { AppDataSource } from "../Backend/data-source.js";

const categoriaRepo = AppDataSource.getRepository("Categoria");
const estadoRepo = AppDataSource.getRepository("Estado");
const prioridadRepo = AppDataSource.getRepository("Prioridad");
const departamentoRepo = AppDataSource.getRepository("Departamento");
const usuarioRepo = AppDataSource.getRepository("Usuario");
const tableroRepo = AppDataSource.getRepository("Tablero");
const tareaRepo = AppDataSource.getRepository("Tarea");
const tareaTableroRepo = AppDataSource.getRepository("TareaTablero");

async function insertarDatosIniciales() {
    try {
        await AppDataSource.initialize();

        // 1. Departamentos
        const departamentos = await departamentoRepo.save([
            { Nombre: "Desarrollo", Descripcion: "Departamento de desarrollo de software" },
            { Nombre: "Marketing", Descripcion: "Departamento de marketing y contenido" }
        ]);

        // 2. Usuarios
        const usuarios = await usuarioRepo.save([
            {
                Nombre: "Ana Torres",
                Correo: "ana@empresa.com",
                Clave: "1234",
                Rol: "Administrador",
                Departamento: departamentos[0]
            },
            {
                Nombre: "Marta Gómez",
                Correo: "marta@empresa.com",
                Clave: "1234",
                Rol: "Colaborador",
                Departamento: departamentos[1]
            }
        ]);

        // 3. Categorías
        const categorias = await categoriaRepo.save([
            { Nombre: "General", Descripcion: "Tareas generales" },
            { Nombre: "Soporte Técnico", Descripcion: "Tareas de soporte" },
            { Nombre: "Campañas", Descripcion: "Campañas publicitarias" }
        ]);

        // 4. Estados
        const estados = await estadoRepo.save([
            { Nombre: "Por hacer", Descripcion: "Pendiente de iniciar" },
            { Nombre: "En progreso", Descripcion: "En desarrollo" },
            { Nombre: "Finalizada", Descripcion: "Completada" }
        ]);

        // 5. Prioridades
        const prioridades = await prioridadRepo.save([
            { Nombre: "Alta", Nivel: 1, Color: "#FF0000", NombreColor: "Rojo" },
            { Nombre: "Media", Nivel: 2, Color: "#FFA500", NombreColor: "Naranja" },
            { Nombre: "Baja", Nivel: 3, Color: "#008000", NombreColor: "Verde" }
        ]);

        // 6. Tableros
        const tableros = await tableroRepo.save([
            {
                Nombre: "Tablero de Desarrollo",
                Descripcion: "Sprint de desarrollo web",
                FechaCreacion: new Date(),
                Usuario: usuarios[0],
                Departamento: departamentos[0]
            },
            {
                Nombre: "Tablero de Marketing",
                Descripcion: "Plan mensual de redes sociales",
                FechaCreacion: new Date(),
                Usuario: usuarios[1],
                Departamento: departamentos[1]
            }
        ]);

        // 7. Tareas
        const tareas = await tareaRepo.save([
            {
                Titulo: "Diseñar interfaz",
                Descripcion: "Mockups en Figma",
                FechaCreacion: new Date(),
                FechaLimite: new Date(Date.now() + 3 * 86400000),
                Contenido: "Diseño preliminar para revisión",
                Activo: true,
                Categoria: categorias[0],
                Estado: estados[0],
                Prioridad: prioridades[0],
                Usuario: usuarios[0]
            },
            {
                Titulo: "Resolver ticket 502",
                Descripcion: "Error al ingresar en producción",
                FechaCreacion: new Date(),
                FechaLimite: new Date(Date.now() + 2 * 86400000),
                Contenido: "Stack trace y log adjunto",
                Activo: true,
                Categoria: categorias[1],
                Estado: estados[1],
                Prioridad: prioridades[1],
                Usuario: usuarios[0]
            },
            {
                Titulo: "Lanzar campaña Instagram",
                Descripcion: "Promoción del mes",
                FechaCreacion: new Date(),
                FechaLimite: new Date(Date.now() + 5 * 86400000),
                Contenido: "Hashtags, creativos y calendario",
                Activo: true,
                Categoria: categorias[2],
                Estado: estados[0],
                Prioridad: prioridades[2],
                Usuario: usuarios[1]
            }
        ]);

        // 8. Asociar tareas con tableros
        await tareaTableroRepo.save([
            { TareaID: tareas[0].TareaID, TableroID: tableros[0].TableroID },
            { TareaID: tareas[1].TareaID, TableroID: tableros[0].TableroID },
            { TareaID: tareas[2].TareaID, TableroID: tableros[1].TableroID }
        ]);

        console.log("✅ Tableros y tareas insertadas con éxito.");
        await AppDataSource.destroy();
    } catch (error) {
        console.error("❌ Error insertando datos iniciales:", error);
    }
}

insertarDatosIniciales();
