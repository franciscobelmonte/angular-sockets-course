import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { connectedUsers } from '../sockets/socket';
import { ChartData } from '../classes/chart';
import { Map } from '../classes/map';

const router = Router();
const chart = new ChartData();

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

router.get('/chart', (req: Request, res: Response) => {
    res.json({
        error: false,
        chart: chart.getChartData()
    });

});

router.post('/chart', (req: Request, res: Response) => {
    const month = req.body.month;
    const value = Number(req.body.value);

    chart.incrementValue(month, value);

    const server = Server.instance;
    server.io.emit('change-data', chart.getChartData());

    res.json({
        error: false,
        chart: chart.getChartData()
    });

});

const map = new Map();

const places = [
    {
        id: '1',
        name: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        name: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        name: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
]

map.markers.push(...places);

router.get('/map', (req: Request, res: Response) => {
    res.json(map.getMarkers());
})

export default router;