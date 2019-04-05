"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_list_1 = require("../classes/user-list");
const user_1 = require("../classes/user");
exports.connectedUsers = new user_list_1.UserList();
exports.connectClient = (client, io) => {
    const user = new user_1.User(client.id);
    exports.connectedUsers.add(user);
};
exports.disconnect = (client, io) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
        exports.connectedUsers.deleteUser(client.id);
        io.emit('connected-users', exports.connectedUsers.getList());
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
        exports.connectedUsers.updateName(client.id, payload.name);
        io.emit('connected-users', exports.connectedUsers.getList());
        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });
    });
};
