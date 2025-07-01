/**
 * Punto de entrada principal del servidor.
 * - Levanta Express desde Backend/app.js
 * - Configura Socket.IO
 */

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import { app as backendApp } from './Backend/app.js'; // Usa app del backend

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

// Compartir instancia de io con Express (para usarla en controladores)
backendApp.set('io', io);

// Middleware principal
app.use('/', backendApp);

// Configurar WebSocket
io.on('connection', socket => {
    console.log('🟢 Cliente conectado vía WebSocket');

    socket.on('join_tablero', tableroID => {
        socket.join(`tablero_${tableroID}`);
        console.log(`Se unió a la sala: tablero_${tableroID}`);
    });

    socket.on('join_departamento', departamentoID => {
        socket.join(`departamento_${departamentoID}`);
        console.log(`Se unió a la sala: departamento_${departamentoID}`);
    });

    socket.on('disconnect', () => {
        console.log('🔴 Cliente desconectado');
    });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
});
