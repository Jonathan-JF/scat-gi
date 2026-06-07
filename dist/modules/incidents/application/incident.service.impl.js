"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentService = exports.IncidentServiceImpl = void 0;
const client_1 = require("@prisma/client");
const queue_config_1 = require("../../../config/queue.config");
const incident_errors_1 = require("../domain/incident.errors");
class IncidentServiceImpl {
    constructor(incidentRepository) {
        this.incidentRepository = incidentRepository;
    }
    async create(dto, operatorId) {
        const report = await this.incidentRepository.findReportById(dto.reportId);
        if (!report) {
            throw new incident_errors_1.IncidentError('REPORT_NOT_FOUND', 404, 'Reporte no encontrado');
        }
        if (report.status !== client_1.ReportStatus.PENDING) {
            throw new incident_errors_1.IncidentError('REPORT_ALREADY_PROCESSED', 409, 'El reporte ya fue procesado');
        }
        const incident = await this.incidentRepository.create({
            reportId: dto.reportId,
            operatorId,
            name: dto.name,
            description: dto.description,
            severity: dto.severity,
            latitude: report.latitude,
            longitude: report.longitude,
        });
        await queue_config_1.alertQueue.add('process-alert', { incidentId: incident.id });
        return { success: true, data: this.mapToDto(incident) };
    }
    async findActive() {
        const incidents = await this.incidentRepository.findActive();
        return { success: true, data: incidents.map((i) => this.mapToDto(i)) };
    }
    async findById(id) {
        const incident = await this.incidentRepository.findById(id);
        if (!incident) {
            throw new incident_errors_1.IncidentError('INCIDENT_NOT_FOUND', 404, 'Incidente no encontrado');
        }
        return { success: true, data: this.mapToDto(incident) };
    }
    async updateStatus(id, dto) {
        const incident = await this.incidentRepository.findById(id);
        if (!incident) {
            throw new incident_errors_1.IncidentError('INCIDENT_NOT_FOUND', 404, 'Incidente no encontrado');
        }
        const updated = await this.incidentRepository.updateStatus(id, dto.status);
        return { success: true, data: this.mapToDto(updated) };
    }
    async findHistory(page = 1, limit = 20) {
        const { items, total } = await this.incidentRepository.findHistory(page, limit);
        return {
            success: true,
            data: items.map((i) => this.mapToDto(i)),
            meta: { page, limit, total },
        };
    }
    mapToDto(incident) {
        return {
            id: incident.id,
            reportId: incident.reportId ?? undefined,
            operatorId: incident.operatorId ?? undefined,
            name: incident.name,
            description: incident.description ?? undefined,
            severity: incident.severity,
            status: incident.status,
            latitude: incident.latitude,
            longitude: incident.longitude,
            startedAt: incident.startedAt,
            resolvedAt: incident.resolvedAt ?? undefined,
            createdAt: incident.createdAt,
        };
    }
}
exports.IncidentServiceImpl = IncidentServiceImpl;
exports.IncidentService = IncidentServiceImpl;
//# sourceMappingURL=incident.service.impl.js.map