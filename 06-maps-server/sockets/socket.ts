import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';
import { map } from '../routes/router';

export const connectedUsers = new UserList();

export const connectClient = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);
    connectedUsers.add(user);
}

export const disconnect = (client: Socket, io: socketIO.Server) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
        connectedUsers.deleteUser(client.id);
        io.emit('connected-users', connectedUsers.getList());
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
        io.emit('connected-users', connectedUsers.getList());
        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });
    });
};

export const getUsers = (client: Socket, io: socketIO.Server) => {
    client.on('get-users', () => {
        console.log('Get all connected users');
        
        io.to(client.id).emit('connected-users', connectedUsers.getList());
    });
};

export const newMarker = (client: Socket, io: socketIO.Server) => {
    client.on('new-marker', (marker) => {
        console.log('New marker', marker);
        map.addMarker(marker);

        client.broadcast.emit('new-marker', marker);
    });
};
