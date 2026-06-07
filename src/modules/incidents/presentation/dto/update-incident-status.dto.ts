import { z } from 'zod';

export const UpdateIncidentStatusDtoSchema = z.object({
  status: z.enum(['ACTIVE', 'CONTAINED', 'RESOLVED']),
});

export type UpdateIncidentStatusDto = z.infer<typeof UpdateIncidentStatusDtoSchema>;
