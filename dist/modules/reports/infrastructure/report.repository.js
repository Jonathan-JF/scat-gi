"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../../shared/database/prisma");
class ReportRepository {
    constructor() {
        this.prisma = prisma_1.prisma;
    }
    async create(data) {
        return this.prisma.report.create({
            data: {
                citizenId: data.citizenId,
                description: data.description,
                photoUrl: data.photoUrl,
                videoUrl: data.videoUrl,
                latitude: data.latitude,
                longitude: data.longitude,
                status: client_1.ReportStatus.PENDING,
            },
        });
    }
    async findById(id) {
        return this.prisma.report.findUnique({ where: { id } });
    }
    async findAll() {
        return this.prisma.report.findMany({ orderBy: { createdAt: 'desc' } });
    }
    async findByCitizenId(citizenId) {
        return this.prisma.report.findMany({
            where: { citizenId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.report.update({
            where: { id },
            data: { status },
        });
    }
}
exports.ReportRepository = ReportRepository;
//# sourceMappingURL=report.repository.js.map