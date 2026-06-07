import { AppError } from '@/shared/error/app.error';

export class UserError extends AppError {
  constructor(code: string, statusCode: number, message: string) {
    super(code, statusCode, message);
    this.name = 'UserError';
  }
}

export const UserErrors = {
  USER_NOT_FOUND: new UserError('USER_NOT_FOUND', 404, 'Usuario no encontrado'),
  EMAIL_ALREADY_EXISTS: new UserError('EMAIL_ALREADY_EXISTS', 409, 'El email ya está registrado'),
  INVALID_CREDENTIALS: new UserError('INVALID_CREDENTIALS', 401, 'Email o contraseña inválidos'),
  UNAUTHORIZED: new UserError('UNAUTHORIZED', 401, 'No autorizado'),
};
