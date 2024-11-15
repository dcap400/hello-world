const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public')); // Serve the client files from the 'public' folder

io.on('connection', (socket) => {
    console.log('A user connected');

    // Broadcast messages to all connected clients
    socket.on('newMessage', (data) => {
        io.emit('newMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
