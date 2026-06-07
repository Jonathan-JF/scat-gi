"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentRepository = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../shared/database/prisma");
class IncidentRepository {
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async create(data) {
        return this.prisma.$transaction(async (tx) => {
            const incident = await tx.incident.create({
                data: {
                    reportId: data.reportId,
                    operatorId: data.operatorId,
                    name: data.name,
                    description: data.description,
                    severity: data.severity,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    status: client_1.IncidentStatus.ACTIVE,
                },
            });
            await tx.report.update({
                where: { id: data.reportId },
                data: { status: client_1.ReportStatus.REVIEWED },
            });
            return incident;
        });
    }
    async findById(id) {
        return this.prisma.incident.findUnique({ where: { id } });
    }
    async findActive() {
        return this.prisma.incident.findMany({
            where: { status: { in: [client_1.IncidentStatus.ACTIVE, client_1.IncidentStatus.CONTAINED] } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findHistory(page, limit) {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.prisma.incident.findMany({
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.incident.count(),
        ]);
        return { items, total };
    }
    async updateStatus(id, status) {
        return this.prisma.incident.update({
            where: { id },
            data: {
                status,
                resolvedAt: status === client_1.IncidentStatus.RESOLVED ? new Date() : null,
            },
        });
    }
    async findReportById(reportId) {
        return this.prisma.report.findUnique({ where: { id: reportId } });
    }
}
exports.IncidentRepository = IncidentRepository;
//# sourceMappingURL=incident.repository.js.map