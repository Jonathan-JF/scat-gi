import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { requireRole } from '@/middleware/role.middleware';
import { GeoController } from './geo.controller';
import { GeoService } from '../application/geo.service';
import { GeoRepository } from '../infrastructure/geo.repository';

const router = Router();
const geoRepository = new GeoRepository();
const geoService = new GeoService(geoRepository);
const geoController = new GeoController(geoService);

router.get(
  '/geo/incidents/active',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  geoController.getActiveIncidents
);
router.get(
  '/geo/reports/recent',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  geoController.getRecentReports
);
router.get(
  '/geo/risk-zones',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  geoController.getRiskZones
);

export default router;
