"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoRepository = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../shared/database/prisma");
class GeoRepository {
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async findActiveIncidents() {
        return this.prisma.incident.findMany({
            where: { status: { in: [client_1.IncidentStatus.ACTIVE, client_1.IncidentStatus.CONTAINED] } },
            select: {
                id: true,
                name: true,
                severity: true,
                status: true,
                latitude: true,
                longitude: true,
            },
        });
    }
    async findRecentReports() {
        const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
        return this.prisma.report.findMany({
            where: { createdAt: { gte: since } },
            select: {
                id: true,
                description: true,
                status: true,
                latitude: true,
                longitude: true,
                createdAt: true,
            },
        });
    }
    async findRiskZones() {
        return this.prisma.riskZone.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                geometry: true,
                riskLevel: true,
            },
        });
    }
}
exports.GeoRepository = GeoRepository;
//# sourceMappingURL=geo.repository.js.map