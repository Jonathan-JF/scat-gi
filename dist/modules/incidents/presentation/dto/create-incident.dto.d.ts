import { z } from 'zod';
export declare const CreateIncidentDtoSchema: z.ZodObject<{
    reportId: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    severity: z.ZodDefault<z.ZodEnum<{
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        CRITICAL: "CRITICAL";
    }>>;
}, z.core.$strip>;
export type CreateIncidentDto = z.infer<typeof CreateIncidentDtoSchema>;
//# sourceMappingURL=create-incident.dto.d.ts.map