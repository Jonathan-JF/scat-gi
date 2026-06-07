import { Response } from 'express';
import { AppError } from '@/shared/error/app.error';
import { AuthenticatedRequest } from '@/middleware/auth.middleware';
import { IncidentService } from '../application/incident.service.impl';
import { CreateIncidentDtoSchema } from './dto/create-incident.dto';
import { UpdateIncidentStatusDtoSchema } from './dto/update-incident-status.dto';

export class IncidentController {
  constructor(private incidentService: IncidentService) {}

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const validation = CreateIncidentDtoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validación fallida',
          details: validation.error.issues.map((e) => e.message),
        });
      }

      const result = await this.incidentService.create(validation.data, req.user!.id);
      return res.status(201).json(result);
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

  findActive = async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.incidentService.findActive();
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
      const result = await this.incidentService.findById(req.params.id);
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

  updateStatus = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const validation = UpdateIncidentStatusDtoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validación fallida',
          details: validation.error.issues.map((e) => e.message),
        });
      }

      const result = await this.incidentService.updateStatus(req.params.id, validation.data);
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

  findHistory = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const result = await this.incidentService.findHistory(page, limit);
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
