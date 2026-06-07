import { z } from 'zod';

export const CreateReportDtoSchema = z.object({
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export type CreateReportDto = z.infer<typeof CreateReportDtoSchema>;
