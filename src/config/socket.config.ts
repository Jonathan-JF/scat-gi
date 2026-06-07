import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server | null = null;

export const initSocket = (server: HttpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        process.env.FRONTEND_URL,
      ].filter(Boolean) as string[],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
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

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io no inicializado');
  }
  return io;
};

export const emitToOperators = (event: string, payload: unknown): void => {
  if (io) {
    io.to('operators').emit(event, payload);
    console.log(`[Socket.io] Event emitted: ${event}`);
  }
};
