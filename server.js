const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const connectedDevices = {};

app.use(express.static('public'));

io.on('connection', (socket) => {
    // Handle a new connection
    console.log('A user connected');

    // Listen for a message from the client containing the device's IP address
    socket.on('ipAddress', (ipAddress) => {
        // Add the device to the connectedDevices object
        connectedDevices[ipAddress] = true;

        // Send the updated list of contacts to all clients
        io.emit('updateContacts', Object.keys(connectedDevices));
    });

    // Listen for a message from the client containing a chat message
    socket.on('chatMessage', (data) => {
        // You can handle the chat message here and broadcast it to other clients
        console.log('Message received:', data);

        // For simplicity, let's just broadcast the message to all clients
        io.emit('chatMessage', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');

        // Remove the device from the connectedDevices object
        const ipAddress = Object.keys(connectedDevices).find(
            (key) => connectedDevices[key] === true
        );
        if (ipAddress) {
            delete connectedDevices[ipAddress];

            // Send the updated list of contacts to all clients
            io.emit('updateContacts', Object.keys(connectedDevices));
        }
    });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
