require("dotenv").config();
require("reflect-metadata");

const { AppDataSource } = require("./Backend/data-source");
const { Usuario } = require("./Backend/entities/Usuario");
const setupwebSocket = require("./Backend/websockets/websocket");
const express = require("express");
const http = require("http");
const usuarioRoutes = require("./Backend/routes/usuarioRoutes");

const app = express();
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);

AppDataSource.initialize()
    .then(() => {
        const server = http.createServer(app);
        setupwebSocket(server); // habilita WebSockets

        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("Error al iniciar DataSource:", err));

/* 
async function crearUsuario(req, res) {
    try {
        const usuario = repo.create(req.body);
        const nuevo = await repo.save(usuario);
        broadcast('usuario:creado', nuevo); // <- Emisión WebSocket
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function eliminarUsuario(req, res) {
    try {
        const usuario = await repo.findOneBy({ UsuarioID: parseInt(req.params.id) });
        if (!usuario) return res.status(404).json({ error: 'No encontrado' });

        await repo.remove(usuario);
        broadcast('usuario:eliminado', usuario); // <- Emisión WebSocket
        res.json({ mensaje: 'Eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
*/