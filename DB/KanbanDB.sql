create database GestorKanban
use GestorKanban
go
drop database GestorKanban

create table Departamento(
DepartamentoID int identity(1,1) primary key,
Nombre nvarchar(100),
Descripcion nvarchar(100)
)

create table Usuario(
UsuarioID int identity(1,1) primary key,
DepartamentoID int foreign key references Departamento(DepartamentoID),
Nombre nvarchar(100),
Correo nvarchar(100) unique,
Clave nvarchar(100),
Rol nvarchar(25)
)

create table Categoria(
CategoriaID int identity(1,1) primary key,
Nombre nvarchar(50),
descripcion nvarchar(250)
)

Create table Estado(
EstadoID int identity(1,1) primary key,
Nombre nvarchar(50), --Nueva, Modificada, En progreso, Finalizada, etc
Descripcion nvarchar(100)
)

create table Prioridad(
PrioridadID int identity(1,1) primary Key,
Nombre nvarchar(25),
Nivel int,
Color nvarchar(10), --manejo de color por codigo hexadecimal
NombreColor nvarchar(25)	--agregado para nombrar colores
);

create table Tarea(
TareaID int identity(1,1) primary key,
CategoriaID int foreign key references Categoria(CategoriaID),
UsuarioID int foreign key references Usuario(UsuarioID),
EstadoID int foreign key references Estado(EstadoID),
PrioridadID int foreign key references Prioridad(PrioridadID),
Titulo nvarchar(50),
Descripcion nvarchar(100),
FechaCreacion date,
FechaLimite date,
Contenido nvarchar(max),
Activo bit, --Borrado logico
)

create table TareaUsuario (
TareaID INT FOREIGN KEY REFERENCES Tarea(TareaID),
UsuarioID INT FOREIGN KEY REFERENCES Usuario(UsuarioID),
PRIMARY KEY (TareaID, UsuarioID)
);

create table Archivo(
ArchivoID int identity(1,1) primary key,
TareaID int foreign key references Tarea(TareaID),
Nombre nvarchar(100),
Ruta nvarchar(max),
TipoArchivo nvarchar(10),
Tamanio int,
Fecha date
)

create table Tablero (
TableroID INT IDENTITY(1,1) PRIMARY KEY,
Nombre NVARCHAR(100),
Descripcion NVARCHAR(255),
FechaCreacion DATE,
DepartamentoID INT FOREIGN KEY REFERENCES Departamento(DepartamentoID),
UsuarioID INT FOREIGN KEY REFERENCES Usuario(UsuarioID) -- creador
);

CREATE TABLE TareaTablero (
TareaID INT FOREIGN KEY REFERENCES Tarea(TareaID),
TableroID INT FOREIGN KEY REFERENCES Tablero(TableroID),
PRIMARY KEY (TareaID, TableroID)
);

Create table HistoricoTarea(
HistoricoID int identity(1,1),
TableroID int foreign key references Tablero(TableroID),
TareaID int foreign key references Tarea(TareaID),
EstadoID int foreign key references Estado(EstadoID),
Usuarioid int foreign key references Usuario(UsuarioID),
Motivo nvarchar(100),
FechaActualizacion date
)

select * from sys.tables
select * from Departamento
select * from Usuario

INSERT INTO Departamento (Nombre) VALUES
('Desarrollo'),
('Marketing'),
('Soporte');

INSERT INTO Usuario (Nombre, Correo, Clave, DepartamentoID, Rol) VALUES
('Ana Torres', 'ana@empresa.com', '1234', 1, 'Administrador'),
('Luis Pérez', 'luis@empresa.com', '1234', 1, 'Colaborador'),
('Marta Gómez', 'marta@empresa.com', '1234', 2, 'Colaborador');


INSERT INTO Categoria (Nombre, Descripcion) VALUES
('Tareas Generales', 'Tareas sin categoría específica'),
('Soporte Técnico', 'Tareas relacionadas con asistencia'),
('Marketing Digital', 'Promociones y redes sociales');

INSERT INTO Estado (Nombre) VALUES
('Por hacer'),
('En progreso'),
('Finalizada');

INSERT INTO Prioridad (Nombre, Nivel, Color, NombreColor) VALUES
('Alta',    1, 'FFFF', 'Rojo'),
('Media',   2,  'FFFF', 'Naranja'),
('Baja',    3, 'FFFF', 'Verde'),
('Crítica', 0,  'FFFF', 'Morado'),
('Sin prioridad', 4, 'FFFF', 'Gris');

INSERT INTO Tarea (CategoriaID, Titulo, Descripcion, FechaCreacion, FechaLimite, PrioridadID, Contenido, Activo, EstadoID, UsuarioID) VALUES
(1, 'Crear wireframe', 'Diseño del tablero Kanban', GETDATE(), GETDATE(), 1, 'Diseño inicial del tablero en Figma', 1, 1, 1),
(2, 'Atender ticket #234', 'Problema con acceso de usuario', GETDATE(), GETDATE(), 3, 'Se debe resetear la contraseña', 1, 2, 2),
(3, 'Campaña Instagram', 'Publicar nueva promoción', GETDATE(), GETDATE(), 4, 'Coordinar con diseño y contenidos', 1, 1, 3);

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

select * from Tablero
select * from Tarea
select * from usuario
select * from sys.tables
