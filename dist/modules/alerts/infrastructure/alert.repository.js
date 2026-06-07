"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertRepository = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../shared/database/prisma");
class AlertRepository {
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async create(data) {
        return this.prisma.alert.create({
            data: {
                incidentId: data.incidentId,
                message: data.message,
                channel: data.channel ?? client_1.AlertChannel.SMS,
                status: data.status,
                sentAt: data.sentAt,
            },
        });
    }
    async findById(id) {
        return this.prisma.alert.findUnique({ where: { id } });
    }
    async findActive() {
        return this.prisma.alert.findMany({
            where: { status: { in: [client_1.AlertStatus.SENT, client_1.AlertStatus.PENDING] } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, status, sentAt) {
        return this.prisma.alert.update({
            where: { id },
            data: { status, sentAt },
        });
    }
    async findIncidentById(incidentId) {
        return this.prisma.incident.findUnique({ where: { id: incidentId } });
    }
    async createNotification(alertId, userId) {
        return this.prisma.notification.create({
            data: { alertId, userId, deliveredAt: new Date() },
        });
    }
    async findCitizens() {
        return this.prisma.user.findMany({ where: { role: 'CITIZEN' } });
    }
}
exports.AlertRepository = AlertRepository;
//# sourceMappingURL=alert.repository.js.map