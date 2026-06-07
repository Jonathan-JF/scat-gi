import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { requireRole } from '@/middleware/role.middleware';
import { AlertController } from './alert.controller';
import { AlertService } from '../application/alert.service.impl';
import { AlertRepository } from '../infrastructure/alert.repository';
import { TwilioClient } from '../infrastructure/twilio.client';

const router = Router();
const alertRepository = new AlertRepository();
const twilioClient = new TwilioClient();
const alertService = new AlertService(alertRepository, twilioClient);
const alertController = new AlertController(alertService);

router.get('/alerts', authMiddleware, alertController.findActive);
router.get(
  '/alerts/:id',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN', 'CITIZEN'),
  alertController.findById
);
router.post(
  '/alerts/:id/retry',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  alertController.retry
);

export default router;
