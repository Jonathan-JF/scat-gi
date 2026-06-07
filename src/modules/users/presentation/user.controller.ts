import { Response } from 'express';
import { RegisterDtoSchema } from './dto/register.dto';
import { LoginDtoSchema } from './dto/login.dto';
import { UserService } from '../application/user.service.impl';
import { AppError } from '@/shared/error/app.error';
import { AuthenticatedRequest } from '@/middleware/auth.middleware';

export class UserController {
  constructor(private userService: UserService) {}

  register = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const validation = RegisterDtoSchema.safeParse(req.body);
      if (!validation.success) {
        const errors = validation.error.issues.map((e: any) => e.message);
        return res.status(400).json({
          success: false,
          error: 'Validación fallida',
          details: errors,
        });
      }

      const result = await this.userService.register(validation.data);
      return res.status(201).json(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      }
      console.error('Error en register:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      });
    }
  };

  login = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const validation = LoginDtoSchema.safeParse(req.body);
      if (!validation.success) {
        const errors = validation.error.issues.map((e: any) => e.message);
        return res.status(400).json({
          success: false,
          error: 'Validación fallida',
          details: errors,
        });
      }

      const result = await this.userService.login(validation.data);
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      }
      console.error('Error en login:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      });
    }
  };

  getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          success: false,
          error: 'No autorizado',
        });
      }

      const result = await this.userService.getProfile(userId);
      return res.status(200).json(result);
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          success: false,
          error: error.message,
          code: error.code,
        });
      }
      console.error('Error en getProfile:', error);
      return res.status(500).json({
        success: false,
        error: 'Error interno del servidor',
      });
    }
  };
}
