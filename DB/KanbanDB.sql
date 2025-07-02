create database GestorKanban
use GestorKanban
go
drop database GestorKanban

create table Departamento(
DepartamentoID int identity(1,1) primary key,
Nombre nvarchar(100),
Descripcion nvarchar(100),
Activo bit
)

create table Usuario(
UsuarioID int identity(1,1) primary key,
DepartamentoID int foreign key references Departamento(DepartamentoID),
Nombre nvarchar(100),
Correo nvarchar(100) unique,
Clave nvarchar(100),
Rol nvarchar(25),
Activo bit
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

create table TareaUsuario(
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
Fecha date,
Activo bit -- Eliminacion logica
)

create table Tablero(
TableroID INT IDENTITY(1,1) PRIMARY KEY,
Nombre NVARCHAR(100),
Descripcion NVARCHAR(255),
FechaCreacion DATE,
DepartamentoID INT FOREIGN KEY REFERENCES Departamento(DepartamentoID),
UsuarioID INT FOREIGN KEY REFERENCES Usuario(UsuarioID) -- Usuario creador
);

CREATE TABLE TareaTablero(
TareaID INT FOREIGN KEY REFERENCES Tarea(TareaID),
TableroID INT FOREIGN KEY REFERENCES Tablero(TableroID),
PRIMARY KEY (TareaID, TableroID)
);

Create table HistoricoTarea(
HistoricoID int identity(1,1),
TableroID int foreign key references Tablero(TableroID),
TareaID int foreign key references Tarea(TareaID),
EstadoID int foreign key references Estado(EstadoID),
UsuarioID int foreign key references Usuario(UsuarioID), -- cambio Usuarioid a UsuarioID
ArchivoID int foreign key references Archivo(ArchivoID), -- control de los archivos
Motivo nvarchar(100),
FechaActualizacion date
)

use GestorKanban
select * from sys.tables
select * from db_owner.usuario
select * from db_owner.Tarea
select * from db_owner.Tablero
select * from db_owner.TareaTablero
select * from db_owner.TareaUsuario


select * from db_owner.Departamento
select * from db_owner.Prioridad
select * from db_owner.Estado
select * from db_owner.Categoria
