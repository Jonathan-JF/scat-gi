import { AppError } from '@/shared/error/app.error';

export class AlertError extends AppError {
  constructor(code: string, statusCode: number, message: string) {
    super(code, statusCode, message);
    this.name = 'AlertError';
  }
}
