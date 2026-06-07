import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { requireRole } from '@/middleware/role.middleware';
import { IncidentController } from './incident.controller';
import { IncidentService } from '../application/incident.service.impl';
import { IncidentRepository } from '../infrastructure/incident.repository';

const router = Router();
const incidentRepository = new IncidentRepository();
const incidentService = new IncidentService(incidentRepository);
const incidentController = new IncidentController(incidentService);

router.post(
  '/incidents',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  incidentController.create
);
router.get(
  '/incidents/history',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  incidentController.findHistory
);
router.get(
  '/incidents',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  incidentController.findActive
);
router.get(
  '/incidents/:id',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  incidentController.findById
);
router.patch(
  '/incidents/:id/status',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  incidentController.updateStatus
);

export default router;
