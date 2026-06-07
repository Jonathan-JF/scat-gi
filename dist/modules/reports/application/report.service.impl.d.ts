import { ReportRepository } from '../infrastructure/report.repository';
import { CreateReportDto } from '../presentation/dto/create-report.dto';
import { UpdateReportStatusDto } from '../presentation/dto/update-report-status.dto';
import { ReportDetailResponseDto, ReportListResponseDto } from '../presentation/dto/report-response.dto';
import { IReportService } from './report.service';
export declare class ReportServiceImpl implements IReportService {
    private reportRepository;
    constructor(reportRepository: ReportRepository);
    create(dto: CreateReportDto, citizenId: string, photoUrl?: string): Promise<ReportDetailResponseDto>;
    findAll(): Promise<ReportListResponseDto>;
    findById(id: string): Promise<ReportDetailResponseDto>;
    findMyReports(citizenId: string): Promise<ReportListResponseDto>;
    updateStatus(id: string, dto: UpdateReportStatusDto): Promise<ReportDetailResponseDto>;
    private mapToDto;
}
export { ReportServiceImpl as ReportService };
//# sourceMappingURL=report.service.impl.d.ts.map