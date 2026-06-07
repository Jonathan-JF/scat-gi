import { z } from 'zod';
export declare const RegisterDtoSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    role: z.ZodDefault<z.ZodEnum<{
        CITIZEN: "CITIZEN";
        OPERATOR: "OPERATOR";
    }>>;
}, z.core.$strip>;
export type RegisterDto = z.infer<typeof RegisterDtoSchema>;
//# sourceMappingURL=register.dto.d.ts.map