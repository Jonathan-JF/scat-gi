import { z } from 'zod';
export declare const UpdateIncidentStatusDtoSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        CONTAINED: "CONTAINED";
        RESOLVED: "RESOLVED";
    }>;
}, z.core.$strip>;
export type UpdateIncidentStatusDto = z.infer<typeof UpdateIncidentStatusDtoSchema>;
//# sourceMappingURL=update-incident-status.dto.d.ts.map