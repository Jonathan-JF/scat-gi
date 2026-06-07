import http from 'http';
import app from './app';
import dotenv from 'dotenv';
import { initSocket } from './config/socket.config';
import { startAlertWorker } from './jobs/alert.job';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
initSocket(server);
startAlertWorker();

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
