import { Router } from 'express';
import { authMiddleware } from '@/middleware/auth.middleware';
import { requireRole } from '@/middleware/role.middleware';
import { upload } from '@/config/upload.config';
import { ReportController } from './report.controller';
import { ReportService } from '../application/report.service.impl';
import { ReportRepository } from '../infrastructure/report.repository';

const router = Router();
const reportRepository = new ReportRepository();
const reportService = new ReportService(reportRepository);
const reportController = new ReportController(reportService);

router.post(
  '/reports',
  authMiddleware,
  requireRole('CITIZEN'),
  upload.single('photo'),
  reportController.create
);
router.get('/reports/my', authMiddleware, requireRole('CITIZEN'), reportController.findMyReports);
router.get(
  '/reports',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  reportController.findAll
);
router.get(
  '/reports/:id',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN', 'CITIZEN'),
  reportController.findById
);
router.patch(
  '/reports/:id/status',
  authMiddleware,
  requireRole('OPERATOR', 'ADMIN'),
  reportController.updateStatus
);

export default router;
