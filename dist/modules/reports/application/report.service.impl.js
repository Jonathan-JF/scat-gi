"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = exports.ReportServiceImpl = void 0;
const report_errors_1 = require("../domain/report.errors");
class ReportServiceImpl {
    constructor(reportRepository) {
        this.reportRepository = reportRepository;
    }
    async create(dto, citizenId, photoUrl) {
        const report = await this.reportRepository.create({
            citizenId,
            description: dto.description,
            latitude: dto.latitude,
            longitude: dto.longitude,
            photoUrl,
        });
        return { success: true, data: this.mapToDto(report) };
    }
    async findAll() {
        const reports = await this.reportRepository.findAll();
        return { success: true, data: reports.map((r) => this.mapToDto(r)) };
    }
    async findById(id) {
        const report = await this.reportRepository.findById(id);
        if (!report) {
            throw new report_errors_1.ReportError('REPORT_NOT_FOUND', 404, 'Reporte no encontrado');
        }
        return { success: true, data: this.mapToDto(report) };
    }
    async findMyReports(citizenId) {
        const reports = await this.reportRepository.findByCitizenId(citizenId);
        return { success: true, data: reports.map((r) => this.mapToDto(r)) };
    }
    async updateStatus(id, dto) {
        const report = await this.reportRepository.findById(id);
        if (!report) {
            throw new report_errors_1.ReportError('REPORT_NOT_FOUND', 404, 'Reporte no encontrado');
        }
        const updated = await this.reportRepository.updateStatus(id, dto.status);
        return { success: true, data: this.mapToDto(updated) };
    }
    mapToDto(report) {
        return {
            id: report.id,
            citizenId: report.citizenId,
            description: report.description,
            photoUrl: report.photoUrl ?? undefined,
            videoUrl: report.videoUrl ?? undefined,
            latitude: report.latitude,
            longitude: report.longitude,
            status: report.status,
            createdAt: report.createdAt,
        };
    }
}
exports.ReportServiceImpl = ReportServiceImpl;
exports.ReportService = ReportServiceImpl;
//# sourceMappingURL=report.service.impl.js.map