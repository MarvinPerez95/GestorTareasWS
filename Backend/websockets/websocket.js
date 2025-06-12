const webSocket = require('ws')

let wss

function broadcast(event, data) {
    const payload = JSON.stringify({ event, data })

    wss.clients.forEarch(client => {
        if (client.readyStates == webSocket.OPEN) {
            client.send(payload)
        }
    })
}

function setupwebSocket(server) {
    wss = new webSocket.Server({ server })

    wss.on('connection', ws => {
        console.log('Cliente Conectado WS')
        ws.send(JSON.stringify({ event: 'connected', data: 'webSocket list' }))
    })
}

module.exports = setupwebSocket
module.exports.broadcast = broadcast