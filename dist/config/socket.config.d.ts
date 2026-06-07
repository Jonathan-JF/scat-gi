import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
export declare const initSocket: (server: HttpServer) => Server;
export declare const getIO: () => Server;
export declare const emitToOperators: (event: string, payload: unknown) => void;
//# sourceMappingURL=socket.config.d.ts.map