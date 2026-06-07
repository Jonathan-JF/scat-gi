"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertController = void 0;
const app_error_1 = require("../../../shared/error/app.error");
class AlertController {
    constructor(alertService) {
        this.alertService = alertService;
        this.findActive = async (_req, res) => {
            try {
                const result = await this.alertService.findActive();
                return res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        error: error.message,
                        code: error.code,
                    });
                }
                return res.status(500).json({ success: false, error: 'Error interno del servidor' });
            }
        };
        this.findById = async (req, res) => {
            try {
                const result = await this.alertService.findById(req.params.id);
                return res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        error: error.message,
                        code: error.code,
                    });
                }
                return res.status(500).json({ success: false, error: 'Error interno del servidor' });
            }
        };
        this.retry = async (req, res) => {
            try {
                const result = await this.alertService.retry(req.params.id);
                return res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        error: error.message,
                        code: error.code,
                    });
                }
                return res.status(500).json({ success: false, error: 'Error interno del servidor' });
            }
        };
    }
}
exports.AlertController = AlertController;
//# sourceMappingURL=alert.controller.js.map