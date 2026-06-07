import express, { Express } from 'express';
import path from 'path';
import { corsConfig } from './config/cors.config';
import { errorMiddleware } from './middleware/error.middleware';
import userRoutes from './modules/users/presentation/user.routes';
import reportRoutes from './modules/reports/presentation/report.routes';
import incidentRoutes from './modules/incidents/presentation/incident.routes';
import alertRoutes from './modules/alerts/presentation/alert.routes';
import geoRoutes from './modules/geo/presentation/geo.routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsConfig);
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api', userRoutes);
app.use('/api', reportRoutes);
app.use('/api', incidentRoutes);
app.use('/api', alertRoutes);
app.use('/api', geoRoutes);

app.use(errorMiddleware);

export default app;
