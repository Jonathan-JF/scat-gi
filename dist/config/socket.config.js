"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitToOperators = exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: [
                'http://localhost:5173',
                'http://localhost:3000',
                process.env.FRONTEND_URL,
            ].filter(Boolean),
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log(`[Socket.io] Client connected: ${socket.id}`);
        socket.on('join:operators', () => {
            socket.join('operators');
            console.log(`[Socket.io] ${socket.id} joined operators room`);
        });
        socket.on('disconnect', () => {
            console.log(`[Socket.io] Client disconnected: ${socket.id}`);
        });
    });
    return io;
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io) {
        throw new Error('Socket.io no inicializado');
    }
    return io;
};
exports.getIO = getIO;
const emitToOperators = (event, payload) => {
    if (io) {
        io.to('operators').emit(event, payload);
        console.log(`[Socket.io] Event emitted: ${event}`);
    }
};
exports.emitToOperators = emitToOperators;
//# sourceMappingURL=socket.config.js.map