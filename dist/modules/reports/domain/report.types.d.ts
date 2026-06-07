import { ReportStatus } from '@prisma/client';
export type ReportEntity = {
    id: string;
    citizenId: string;
    description: string;
    photoUrl: string | null;
    videoUrl: string | null;
    latitude: number;
    longitude: number;
    status: ReportStatus;
    createdAt: Date;
    updatedAt: Date;
};
//# sourceMappingURL=report.types.d.ts.map