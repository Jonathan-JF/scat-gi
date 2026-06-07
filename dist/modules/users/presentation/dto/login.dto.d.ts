import { z } from 'zod';
export declare const LoginDtoSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginDto = z.infer<typeof LoginDtoSchema>;
//# sourceMappingURL=login.dto.d.ts.map