import { Response } from 'express';
import { AppError } from '@/shared/error/app.error';
import { AuthenticatedRequest } from '@/middleware/auth.middleware';
import { ReportService } from '../application/report.service.impl';
import { CreateReportDtoSchema } from './dto/create-report.dto';
import { UpdateReportStatusDtoSchema } from './dto/update-report-status.dto';

export class ReportController {
  constructor(private reportService: ReportService) {}

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const validation = CreateReportDtoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validación fallida',
          details: validation.error.issues.map((e) => e.message),
        });
      }

      const file = (req as AuthenticatedRequest & { file?: Express.Multer.File }).file;
      const photoUrl = file ? `/uploads/${file.filename}` : undefined;
      const result = await this.reportService.create(validation.data, req.user!.id, photoUrl);
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

  findAll = async (_req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.reportService.findAll();
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
      const result = await this.reportService.findById(req.params.id);
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

  findMyReports = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const result = await this.reportService.findMyReports(req.user!.id);
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
      const validation = UpdateReportStatusDtoSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: 'Validación fallida',
          details: validation.error.issues.map((e) => e.message),
        });
      }

      const result = await this.reportService.updateStatus(req.params.id, validation.data);
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
