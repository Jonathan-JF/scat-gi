import { z } from 'zod';

export const CreateIncidentDtoSchema = z.object({
  reportId: z.string().min(1),
  name: z.string().min(3),
  description: z.string().optional(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
});

export type CreateIncidentDto = z.infer<typeof CreateIncidentDtoSchema>;
