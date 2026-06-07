"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const app_error_1 = require("../shared/error/app.error");
const errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof app_error_1.AppError) {
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
exports.errorMiddleware = errorMiddleware;
//# sourceMappingURL=error.middleware.js.map