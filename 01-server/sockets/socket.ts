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