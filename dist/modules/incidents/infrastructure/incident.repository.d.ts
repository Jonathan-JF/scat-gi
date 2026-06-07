import { Incident, IncidentSeverity, IncidentStatus } from '@prisma/client';
export declare class IncidentRepository {
    private prisma;
    create(data: {
        reportId: string;
        operatorId: string;
        name: string;
        description?: string;
        severity: IncidentSeverity;
        latitude: number;
        longitude: number;
    }): Promise<Incident>;
    findById(id: string): Promise<Incident | null>;
    findActive(): Promise<Incident[]>;
    findHistory(page: number, limit: number): Promise<{
        items: Incident[];
        total: number;
    }>;
    updateStatus(id: string, status: IncidentStatus): Promise<Incident>;
    findReportById(reportId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        citizenId: string;
        description: string;
        photoUrl: string | null;
        videoUrl: string | null;
        latitude: number;
        longitude: number;
        status: import(".prisma/client").$Enums.ReportStatus;
    } | null>;
}
//# sourceMappingURL=incident.repository.d.ts.map