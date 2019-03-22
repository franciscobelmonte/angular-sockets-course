"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/messages', (req, res) => {
    res.json({
        error: false,
        message: 'Get Messages'
    });
});
router.post('/messages', (req, res) => {
    const body = req.body.body;
    const from = req.body.from;
    res.json({
        error: false,
        body,
        from
    });
});
router.post('/messages/:id', (req, res) => {
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
exports.default = router;
