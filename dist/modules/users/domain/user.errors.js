"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserErrors = exports.UserError = void 0;
const app_error_1 = require("../../../shared/error/app.error");
class UserError extends app_error_1.AppError {
    constructor(code, statusCode, message) {
        super(code, statusCode, message);
        this.name = 'UserError';
    }
}
exports.UserError = UserError;
exports.UserErrors = {
    USER_NOT_FOUND: new UserError('USER_NOT_FOUND', 404, 'Usuario no encontrado'),
    EMAIL_ALREADY_EXISTS: new UserError('EMAIL_ALREADY_EXISTS', 409, 'El email ya está registrado'),
    INVALID_CREDENTIALS: new UserError('INVALID_CREDENTIALS', 401, 'Email o contraseña inválidos'),
    UNAUTHORIZED: new UserError('UNAUTHORIZED', 401, 'No autorizado'),
};
//# sourceMappingURL=user.errors.js.map