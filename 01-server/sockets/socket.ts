import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const disconnect = (client: Socket) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
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
        callback({
            ok: true,
            message: `User ${payload.name} configured`
        });
    });
};