import { Report, ReportStatus } from '@prisma/client';
export declare class ReportRepository {
    private prisma;
    create(data: {
        citizenId: string;
        description: string;
        photoUrl?: string;
        videoUrl?: string;
        latitude: number;
        longitude: number;
    }): Promise<Report>;
    findById(id: string): Promise<Report | null>;
    findAll(): Promise<Report[]>;
    findByCitizenId(citizenId: string): Promise<Report[]>;
    updateStatus(id: string, status: ReportStatus): Promise<Report>;
}
//# sourceMappingURL=report.repository.d.ts.map