const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve a basic message for testing
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// WebSocket setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('newMessage', (data) => {
        io.emit('newMessage', data); // Broadcast the message
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const cors = require('cors');
app.use(cors());
