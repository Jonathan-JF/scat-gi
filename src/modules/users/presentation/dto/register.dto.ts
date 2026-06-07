import { z } from 'zod';

export const RegisterDtoSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  phone: z.string().optional(),
  role: z.enum(['CITIZEN', 'OPERATOR']).default('CITIZEN'),
});

export type RegisterDto = z.infer<typeof RegisterDtoSchema>;
