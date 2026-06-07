import { z } from 'zod';
export declare const UpdateReportStatusDtoSchema: z.ZodObject<{
    status: z.ZodEnum<{
        PENDING: "PENDING";
        REVIEWED: "REVIEWED";
        REJECTED: "REJECTED";
    }>;
}, z.core.$strip>;
export type UpdateReportStatusDto = z.infer<typeof UpdateReportStatusDtoSchema>;
//# sourceMappingURL=update-report-status.dto.d.ts.map