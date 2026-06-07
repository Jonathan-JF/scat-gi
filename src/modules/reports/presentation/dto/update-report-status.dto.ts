import { z } from 'zod';

export const UpdateReportStatusDtoSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWED', 'REJECTED']),
});

export type UpdateReportStatusDto = z.infer<typeof UpdateReportStatusDtoSchema>;
