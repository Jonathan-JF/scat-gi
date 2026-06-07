"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentController = void 0;
const app_error_1 = require("../../../shared/error/app.error");
const create_incident_dto_1 = require("./dto/create-incident.dto");
const update_incident_status_dto_1 = require("./dto/update-incident-status.dto");
class IncidentController {
    constructor(incidentService) {
        this.incidentService = incidentService;
        this.create = async (req, res) => {
            try {
                const validation = create_incident_dto_1.CreateIncidentDtoSchema.safeParse(req.body);
                if (!validation.success) {
                    return res.status(400).json({
                        success: false,
                        error: 'Validación fallida',
                        details: validation.error.issues.map((e) => e.message),
                    });
                }
                const result = await this.incidentService.create(validation.data, req.user.id);
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
        this.findActive = async (_req, res) => {
            try {
                const result = await this.incidentService.findActive();
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
                const result = await this.incidentService.findById(req.params.id);
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
                const validation = update_incident_status_dto_1.UpdateIncidentStatusDtoSchema.safeParse(req.body);
                if (!validation.success) {
                    return res.status(400).json({
                        success: false,
                        error: 'Validación fallida',
                        details: validation.error.issues.map((e) => e.message),
                    });
                }
                const result = await this.incidentService.updateStatus(req.params.id, validation.data);
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
        this.findHistory = async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 20;
                const result = await this.incidentService.findHistory(page, limit);
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
exports.IncidentController = IncidentController;
//# sourceMappingURL=incident.controller.js.map