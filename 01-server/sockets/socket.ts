import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const connectedUsers = new UserList();

export const connectClient = (client: Socket) => {
    const user = new User(client.id);
    connectedUsers.add(user);
}

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
        connectedUsers.deleteUser(client.id);
    });
};

export const message = (client: Socket, io: socketIO.Server) => {
    client.on('message', (payload: {from: string, message: string}) => {
        console.log('Message received', payload);
        io.emit('new-message', payload);
    });
};

export const configureUser = (client: Socket, io: socketIO.Server) => {
    client.on('configure-user', (payload: {name: string}, callback: Function) => {
        console.log('Configuring user', payload.name);
        connectedUsers.updateName(client.id, payload.name);
        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });
    });
};