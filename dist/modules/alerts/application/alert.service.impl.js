"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertService = exports.AlertServiceImpl = void 0;
const client_1 = require("@prisma/client");
const socket_config_1 = require("../../../config/socket.config");
const alert_errors_1 = require("../domain/alert.errors");
class AlertServiceImpl {
    constructor(alertRepository, twilioClient) {
        this.alertRepository = alertRepository;
        this.twilioClient = twilioClient;
    }
    async processIncident(incidentId) {
        const incident = await this.alertRepository.findIncidentById(incidentId);
        if (!incident) {
            throw new alert_errors_1.AlertError('INCIDENT_NOT_FOUND', 404, 'Incidente no encontrado');
        }
        const message = `[SCAT-GI ALERTA] ${incident.name} | Severidad: ${incident.severity} | Coordenadas: ${incident.latitude}, ${incident.longitude} | Hora: ${new Date().toISOString()}`;
        const citizens = await this.alertRepository.findCitizens();
        let smsSuccess = true;
        for (const citizen of citizens) {
            if (citizen.phone) {
                const result = await this.twilioClient.sendSMS(citizen.phone, message);
                if (!result.success)
                    smsSuccess = false;
            }
        }
        const alert = await this.alertRepository.create({
            incidentId,
            message,
            status: smsSuccess ? client_1.AlertStatus.SENT : client_1.AlertStatus.FAILED,
            sentAt: smsSuccess ? new Date() : undefined,
        });
        for (const citizen of citizens) {
            await this.alertRepository.createNotification(alert.id, citizen.id);
        }
        (0, socket_config_1.emitToOperators)('alert:issued', this.mapToDto(alert));
    }
    async findActive() {
        const alerts = await this.alertRepository.findActive();
        return { success: true, data: alerts.map((a) => this.mapToDto(a)) };
    }
    async findById(id) {
        const alert = await this.alertRepository.findById(id);
        if (!alert) {
            throw new alert_errors_1.AlertError('ALERT_NOT_FOUND', 404, 'Alerta no encontrada');
        }
        return { success: true, data: this.mapToDto(alert) };
    }
    async retry(id) {
        const alert = await this.alertRepository.findById(id);
        if (!alert) {
            throw new alert_errors_1.AlertError('ALERT_NOT_FOUND', 404, 'Alerta no encontrada');
        }
        const citizens = await this.alertRepository.findCitizens();
        let smsSuccess = true;
        for (const citizen of citizens) {
            if (citizen.phone) {
                const result = await this.twilioClient.sendSMS(citizen.phone, alert.message);
                if (!result.success)
                    smsSuccess = false;
            }
        }
        const updated = await this.alertRepository.updateStatus(id, smsSuccess ? client_1.AlertStatus.SENT : client_1.AlertStatus.FAILED, smsSuccess ? new Date() : undefined);
        if (smsSuccess) {
            (0, socket_config_1.emitToOperators)('alert:issued', this.mapToDto(updated));
        }
        return { success: true, data: this.mapToDto(updated) };
    }
    mapToDto(alert) {
        return {
            id: alert.id,
            incidentId: alert.incidentId,
            message: alert.message,
            channel: alert.channel,
            status: alert.status,
            sentAt: alert.sentAt ?? undefined,
            createdAt: alert.createdAt,
        };
    }
}
exports.AlertServiceImpl = AlertServiceImpl;
exports.AlertService = AlertServiceImpl;
//# sourceMappingURL=alert.service.impl.js.map