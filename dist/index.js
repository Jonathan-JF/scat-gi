"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_config_1 = require("./config/socket.config");
const alert_job_1 = require("./jobs/alert.job");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
(0, socket_config_1.initSocket)(server);
(0, alert_job_1.startAlertWorker)();
server.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📝 Health check: http://localhost:${PORT}/health`);
    console.log(`🔐 Auth: POST /api/auth/register | POST /api/auth/login`);
    console.log(`📡 Socket.io ready for dashboard connections`);
});
process.on('SIGTERM', () => {
    console.log('📌 SIGTERM received, shutting down gracefully...');
    server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
    console.log('📌 SIGINT received, shutting down gracefully...');
    server.close(() => process.exit(0));
});
//# sourceMappingURL=index.js.map