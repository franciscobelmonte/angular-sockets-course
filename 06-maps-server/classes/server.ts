import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server{
    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;    

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);

        this.listenSockets();
    }

    static get instance(){
        return this._instance || (this._instance = new this());
    }

    start(callback: any) {
        this.httpServer.listen(this.port, callback);
    }

    private listenSockets() {
        console.log('Listening sockets...');

        this.io.on('connection', client => {
            console.log('Client connected');

            socket.connectClient(client, this.io);
            socket.message(client, this.io);
            socket.configureUser(client, this.io);
            socket.getUsers(client, this.io);
            socket.newMarker(client, this.io);
            socket.deleteMarker(client, this.io);
            socket.disconnect(client, this.io);
        });
    }
}