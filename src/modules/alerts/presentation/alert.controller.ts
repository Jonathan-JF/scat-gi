import { Response } from 'express';
import { AppError } from '@/shared/error/app.error';
import { AuthenticatedRequest } from '@/middleware/auth.middleware';
import { AlertService } from '../application/alert.service.impl';

export class AlertController {
  constructor(private alertService: AlertService) {}

  findActive = async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.alertService.findActive();
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      }
      return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  };

  findById = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.alertService.findById(req.params.id);
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      }
      return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  };

  retry = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.alertService.retry(req.params.id);
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      }
      return res.status(500).json({ success: false, error: 'Error interno del servidor' });
    }
  };
}
