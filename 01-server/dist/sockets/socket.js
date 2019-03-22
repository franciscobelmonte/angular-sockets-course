"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = (client) => {
    client.on('disconnect', () => {
        console.log('Client disconnected');
    });
};
