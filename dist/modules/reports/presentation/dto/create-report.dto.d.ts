import { z } from 'zod';
export declare const CreateReportDtoSchema: z.ZodObject<{
    description: z.ZodString;
    latitude: z.ZodCoercedNumber<unknown>;
    longitude: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export type CreateReportDto = z.infer<typeof CreateReportDtoSchema>;
//# sourceMappingURL=create-report.dto.d.ts.map