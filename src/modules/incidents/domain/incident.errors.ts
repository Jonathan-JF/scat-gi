import { AppError } from '@/shared/error/app.error';

export class IncidentError extends AppError {
  constructor(code: string, statusCode: number, message: string) {
    super(code, statusCode, message);
    this.name = 'IncidentError';
  }
}
