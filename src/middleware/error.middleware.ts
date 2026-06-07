import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/error/app.error';

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      code: err.code,
    });
  }

  return res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    code: 'INTERNAL_SERVER_ERROR',
  });
};
