import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { connectedUsers } from '../sockets/socket';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        error: false,
        message: 'Get Messages'
    });
});

router.post('/messages', (req: Request, res: Response) => {
    const message = req.body.message;
    const from = req.body.from;

    const server = Server.instance;
    server.io.emit('new-message', {from, message});

    res.json({
        error: false,
        message,
        from
    });
});

router.post('/messages/:id', (req: Request, res: Response) => {
    const message = req.body.message;
    const from = req.body.from;
    
    const id = req.params.id;
    
    const payload = {
        from,
        message
    };

    const server = Server.instance;
    server.io.in(id).emit('private-message', payload);

    res.json({
        error: false,
        id,
        message,
        from
    });
});

router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients((err, clients: string[]) => {
        if (err) {
            res.json({
                error: true,
                err
            });
        }

        res.json({
            error: false,
            clients
        });
    });
});

router.get('/users/details', (req: Request, res: Response) => {
    res.json({
        error: false,
        clients: connectedUsers.getList()
    });

});

export default router;