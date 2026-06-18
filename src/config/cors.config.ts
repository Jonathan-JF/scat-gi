import cors from 'cors';
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173', // Vite frontend
  'http://localhost:8080', // Dashboard (Nginx en Docker)
  'http://localhost:19000', // Expo
  'http://localhost:8081', // React Native
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:8080',
  process.env.FRONTEND_URL,
  process.env.MOBILE_URL,
].filter(Boolean);
export const corsConfig = cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS no permitido'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
 