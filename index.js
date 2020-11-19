const express = require('express')
const socket = require('socket.io')

//App setup
const app = express()

const port = 3000
const server = app.listen(port, (req, res) => {
    console.log('Listening on port: ', port)
})

//Static files
app.use(express.static('public'))

//Socket setup
const io = socket(server)

io.on('connection', (socket) => {
    console.log('New Client Connected: ', socket.id)
    socket.on('message', (data) => {
        io.emit('message', {
            id: socket.id,
            username: data.username,
            message: data.message,
        })
    })
})