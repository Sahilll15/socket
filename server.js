const express = require('express')

const app = express()

const http = require('http')
const server = http.createServer(app);
const { Server } = require('socket.io')
const io = new Server(server);




server.listen(3000, () => {
    console.log('server is running on port 3000')
})

io.on('connection', (socket) => {
    var Joineduser = '';
    console.log('user connected')
    //here is where the message is ->got by the backend
    socket.on('chat message', (msg) => {
        //this message is again sent back to the frontend
        //using the emit method
        //->go into the frontend
        io.emit('chat message', Joineduser + ': ' + msg)
        console.log(msg)
    })

    socket.on("user", (user) => {
        console.log(user)
        Joineduser = user
        io.emit("user", user)
    })
    socket.on('disconnect', () => {
        io.emit('Leftuser', Joineduser + " has left the chat")
        console.log('user disconnected')
    })
})



app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})



