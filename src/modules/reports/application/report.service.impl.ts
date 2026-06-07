import { Report } from '@prisma/client';
import { ReportRepository } from '../infrastructure/report.repository';
import { ReportError } from '../domain/report.errors';
import { CreateReportDto } from '../presentation/dto/create-report.dto';
import { UpdateReportStatusDto } from '../presentation/dto/update-report-status.dto';
import {
  ReportDetailResponseDto,
  ReportListResponseDto,
  ReportResponseDto,
} from '../presentation/dto/report-response.dto';
import { IReportService } from './report.service';

export class ReportServiceImpl implements IReportService {
  constructor(private reportRepository: ReportRepository) {}

  async create(
    dto: CreateReportDto,
    citizenId: string,
    photoUrl?: string
  ): Promise<ReportDetailResponseDto> {
    const report = await this.reportRepository.create({
      citizenId,
      description: dto.description,
      latitude: dto.latitude,
      longitude: dto.longitude,
      photoUrl,
    });

    return { success: true, data: this.mapToDto(report) };
  }

  async findAll(): Promise<ReportListResponseDto> {
    const reports = await this.reportRepository.findAll();
    return { success: true, data: reports.map((r) => this.mapToDto(r)) };
  }

  async findById(id: string): Promise<ReportDetailResponseDto> {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new ReportError('REPORT_NOT_FOUND', 404, 'Reporte no encontrado');
    }
    return { success: true, data: this.mapToDto(report) };
  }

  async findMyReports(citizenId: string): Promise<ReportListResponseDto> {
    const reports = await this.reportRepository.findByCitizenId(citizenId);
    return { success: true, data: reports.map((r) => this.mapToDto(r)) };
  }

  async updateStatus(id: string, dto: UpdateReportStatusDto): Promise<ReportDetailResponseDto> {
    const report = await this.reportRepository.findById(id);
    if (!report) {
      throw new ReportError('REPORT_NOT_FOUND', 404, 'Reporte no encontrado');
    }

    const updated = await this.reportRepository.updateStatus(id, dto.status);
    return { success: true, data: this.mapToDto(updated) };
  }

  private mapToDto(report: Report): ReportResponseDto {
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

export { ReportServiceImpl as ReportService };
