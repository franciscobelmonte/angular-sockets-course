import { Router, Request, Response } from 'express';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        error: false,
        message: 'Get Messages'
    });
});

router.post('/messages', (req: Request, res: Response) => {
    const body = req.body.body;
    const from = req.body.from;

    res.json({
        error: false,
        body,
        from
    });
});

router.post('/messages/:id', (req: Request, res: Response) => {
    const body = req.body.body;
    const from = req.body.from;
    
    const id = req.params.id;

    res.json({
        error: false,
        id,
        body,
        from
    });
});

export default router;