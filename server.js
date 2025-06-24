require("dotenv").config();
require("reflect-metadata");

const { AppDataSource } = require("./Backend/data-source");
const { Usuario } = require("./Backend/entities/Usuario");
const setupwebSocket = require("./Backend/websockets/websocket");
const express = require("express");
const http = require("http");
const usuarioRoutes = require("./Backend/routes/usuarioRoutes");
const tareaRoutes = require("./Backend/routes/tareaRoutes");
const tableroRoutes = require("./Backend/routes/tableroRoutes");

const app = express();
app.use(express.json());
app.use("/api/usuarios", usuarioRoutes);
app.use("/tareas", tareaRoutes);
app.use("/tableros", tableroRoutes);

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
