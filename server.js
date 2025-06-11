require('dotenv').config();
require('reflect-metadata');
const express = require('express');
const http = require('http');
const { AppDataSource } = require('./Backend/data-source');
const usuarioRoutes = require('./Backend/routes/usuarioRoutes');
const websocket = require('./websocket');

const app = express();
app.use(express.json());
app.use('/api/usuarios', usuarioRoutes);

AppDataSource.initialize()
    .then(() => {
        const server = http.createServer(app);
        websocket(server); // habilita WebSockets

        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error('Error al iniciar DataSource:', err));

// require('reflect-metadata')
// const express = require('express')
// const http = require('http')
// const socketIO = require('socket.io')
// const path = require('path')
// const { AppDataSource } = require('../data-source')
// const usuarioRouters = require('./Backend/routes/usuarioRoutes')
// const webSocket = require('./Backend/websockets')

// const app = express()
// app.use(express.json())
// app.use('/api/usuarios', usuarioRouters)



// const server = http.createServer(app)
// const io = socketIO(server)

// //middleware para servir archivos estaticos
// app.use(express.static(path.join(__dirname, 'frontend/public')))

// //Ruta Inicial
// app.get('/api/status', (req, res) => {
//     res.json({ status: 'Servidor Funcionando' })
// })

// //webSocket
// io.on('connection', (socket) => {
//     console.log(' Usuario Conectado! ')

//     socket.on('disconect', () => {
//         console.log(' Usuario Desconectado')
//     })
// })




// //Puesto
// const PORT = process.env.PORT || 3000
// server.listen(PORT, () => {
//     console.log(`Servidro en ejecucion en http://localhost:${PORT}`)
// })