export declare class GeoRepository {
    private prisma;
    findActiveIncidents(): Promise<{
        name: string;
        id: string;
        latitude: number;
        longitude: number;
        status: import(".prisma/client").$Enums.IncidentStatus;
        severity: import(".prisma/client").$Enums.IncidentSeverity;
    }[]>;
    findRecentReports(): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        latitude: number;
        longitude: number;
        status: import(".prisma/client").$Enums.ReportStatus;
    }[]>;
    findRiskZones(): Promise<{
        name: string;
        id: string;
        description: string | null;
        geometry: import("@prisma/client/runtime/library").JsonValue;
        riskLevel: number;
    }[]>;
}
//# sourceMappingURL=geo.repository.d.ts.map