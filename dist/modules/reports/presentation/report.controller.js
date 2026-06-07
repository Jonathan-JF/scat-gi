"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const app_error_1 = require("../../../shared/error/app.error");
const create_report_dto_1 = require("./dto/create-report.dto");
const update_report_status_dto_1 = require("./dto/update-report-status.dto");
class ReportController {
    constructor(reportService) {
        this.reportService = reportService;
        this.create = async (req, res) => {
            try {
                const validation = create_report_dto_1.CreateReportDtoSchema.safeParse(req.body);
                if (!validation.success) {
                    return res.status(400).json({
                        success: false,
                        error: 'Validación fallida',
                        details: validation.error.issues.map((e) => e.message),
                    });
                }
                const file = req.file;
                const photoUrl = file ? `/uploads/${file.filename}` : undefined;
                const result = await this.reportService.create(validation.data, req.user.id, photoUrl);
                return res.status(201).json(result);
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
        this.findAll = async (_req, res) => {
            try {
                const result = await this.reportService.findAll();
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
                const result = await this.reportService.findById(req.params.id);
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
        this.findMyReports = async (req, res) => {
            try {
                const result = await this.reportService.findMyReports(req.user.id);
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
        this.updateStatus = async (req, res) => {
            try {
                const validation = update_report_status_dto_1.UpdateReportStatusDtoSchema.safeParse(req.body);
                if (!validation.success) {
                    return res.status(400).json({
                        success: false,
                        error: 'Validación fallida',
                        details: validation.error.issues.map((e) => e.message),
                    });
                }
                const result = await this.reportService.updateStatus(req.params.id, validation.data);
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
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map