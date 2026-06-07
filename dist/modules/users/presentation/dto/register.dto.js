"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDtoSchema = void 0;
const zod_1 = require("zod");
exports.RegisterDtoSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: zod_1.z.string().email('Email inválido'),
    password: zod_1.z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    phone: zod_1.z.string().optional(),
    role: zod_1.z.enum(['CITIZEN', 'OPERATOR']).default('CITIZEN'),
});
//# sourceMappingURL=register.dto.js.map