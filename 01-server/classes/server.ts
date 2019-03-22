import express from 'express';
import { SERVER_PORT } from '../globals/environment';
import socket from 'socket.io';
import http from 'http';

export default class Server{
    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socket.Server;
    private httpServer: http.Server;    

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        this.io = socket(this.httpServer);

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
        });
    }

}