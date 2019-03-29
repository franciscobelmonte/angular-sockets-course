"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = (client) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
};
exports.message = (client, io) => {
    client.on('message', (payload) => {
        console.log('Message received', payload);
        io.emit('new-message', payload);
    });
};
exports.configureUser = (client, io) => {
    client.on('configure-user', (payload, callback) => {
        console.log('Configuring user', payload.name);
        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });
    });
};
