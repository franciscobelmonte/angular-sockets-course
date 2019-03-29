import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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

export default router;