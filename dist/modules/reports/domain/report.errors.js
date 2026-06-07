"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportError = void 0;
const app_error_1 = require("../../../shared/error/app.error");
class ReportError extends app_error_1.AppError {
    constructor(code, statusCode, message) {
        super(code, statusCode, message);
        this.name = 'ReportError';
    }
}
exports.ReportError = ReportError;
//# sourceMappingURL=report.errors.js.map