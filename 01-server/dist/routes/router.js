"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
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
    const message = req.body.message;
    const from = req.body.from;
    const id = req.params.id;
    const payload = {
        from,
        message
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('private-message', payload);
    res.json({
        error: false,
        id,
        message,
        from
    });
});
exports.default = router;
