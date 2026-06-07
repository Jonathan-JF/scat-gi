import { CreateReportDto } from '../presentation/dto/create-report.dto';
import { UpdateReportStatusDto } from '../presentation/dto/update-report-status.dto';
import { ReportDetailResponseDto, ReportListResponseDto } from '../presentation/dto/report-response.dto';
export interface IReportService {
    create(dto: CreateReportDto, citizenId: string, photoUrl?: string): Promise<ReportDetailResponseDto>;
    findAll(): Promise<ReportListResponseDto>;
    findById(id: string): Promise<ReportDetailResponseDto>;
    findMyReports(citizenId: string): Promise<ReportListResponseDto>;
    updateStatus(id: string, dto: UpdateReportStatusDto): Promise<ReportDetailResponseDto>;
}
//# sourceMappingURL=report.service.d.ts.map