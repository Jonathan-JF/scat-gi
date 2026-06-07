"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoError = void 0;
const app_error_1 = require("../../../shared/error/app.error");
class GeoError extends app_error_1.AppError {
    constructor(code, statusCode, message) {
        super(code, statusCode, message);
        this.name = 'GeoError';
    }
}
exports.GeoError = GeoError;
//# sourceMappingURL=geo.errors.js.map