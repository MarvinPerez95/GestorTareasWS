const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const path = require('path')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

//middleware para servir archivos estaticos
app.use(express.static(path.join(__dirname, 'frontend/public')))

//Ruta Inicial
app.get('/api/status', (req, res) => {
    res.json({ status: 'Servidor Funcionando' })
})

//webSocket
io.on('connection', (socket) => {
    console.log(' Usuario Conectado! ')

    socket.on('disconect', () => {
        console.log(' Usuario Desconectado')
    })
})

//Puesto 
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Servidro en ejecucion en http://localhost:${PORT}`)
})