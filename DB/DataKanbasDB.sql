use GestorKanban

INSERT INTO Departamento (Nombre) VALUES
('Desarrollo'),
('Marketing'),
('Soporte');

INSERT INTO Usuario (Nombre, Correo, Clave, DepartamentoID, Rol) VALUES
('Ana Torres', 'ana@empresa.com', '1234', 1, 'Administrador'),
('Luis P�rez', 'luis@empresa.com', '1234', 1, 'Colaborador'),
('Marta G�mez', 'marta@empresa.com', '1234', 2, 'Colaborador');


INSERT INTO Categoria (Nombre, Descripcion) VALUES
('Tareas Generales', 'Tareas sin categor�a espec�fica'),
('Soporte T�cnico', 'Tareas relacionadas con asistencia'),
('Marketing Digital', 'Promociones y redes sociales');

INSERT INTO Estado (Nombre) VALUES
('Por hacer'),
('En progreso'),
('Finalizada');

INSERT INTO Prioridad (Nombre, Nivel, Color, NombreColor) VALUES
('Alta',    1, 'FFFF', 'Rojo'),
('Media',   2,  'FFFF', 'Naranja'),
('Baja',    3, 'FFFF', 'Verde'),
('Cr�tica', 0,  'FFFF', 'Morado'),
('Sin prioridad', 4, 'FFFF', 'Gris');

INSERT INTO Tarea (CategoriaID, Titulo, Descripcion, FechaCreacion, FechaLimite, PrioridadID, Contenido, Activo, EstadoID, UsuarioID) VALUES
(1, 'Crear wireframe', 'Dise�o del tablero Kanban', GETDATE(), GETDATE(), 1, 'Dise�o inicial del tablero en Figma', 1, 1, 1),
(2, 'Atender ticket #234', 'Problema con acceso de usuario', GETDATE(), GETDATE(), 3, 'Se debe resetear la contrase�a', 1, 2, 2),
(3, 'Campa�a Instagram', 'Publicar nueva promoci�n', GETDATE(), GETDATE(), 4, 'Coordinar con dise�o y contenidos', 1, 1, 3);

INSERT INTO Archivo (Nombre, Ruta, TareaID) VALUES
('kanban_figma.png', 'C:\\Archivos\\kanban_figma.png', 1),
('ticket234_log.txt', 'C:\\Archivos\\ticket234_log.txt', 2);


INSERT INTO Tablero (Nombre, Descripcion, FechaCreacion, UsuarioID, DepartamentoID) VALUES
('Tablero de Desarrollo', 'Esparcio para los Sprints', GETDATE(), 1, 1),
('Tablero de Marketing', 'Lluvia de ideas', GETDATE(), 3, 2);

INSERT INTO HistoricoTarea (TareaID, EstadoID, UsuarioID, FechaActualizacion) VALUES
(1, 1, 1, GETDATE()),
(1, 2, 1, DATEADD(DAY, 1, GETDATE())),
(2, 1, 2, GETDATE()),
(3, 1, 3, GETDATE());

