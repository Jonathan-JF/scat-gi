import { z } from 'zod';

export const IndexDtoSchema = z.object({}).strict();

export type IndexDto = z.infer<typeof IndexDtoSchema>;
