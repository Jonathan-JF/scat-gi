"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertError = void 0;
const app_error_1 = require("../../../shared/error/app.error");
class AlertError extends app_error_1.AppError {
    constructor(code, statusCode, message) {
        super(code, statusCode, message);
        this.name = 'AlertError';
    }
}
exports.AlertError = AlertError;
//# sourceMappingURL=alert.errors.js.map