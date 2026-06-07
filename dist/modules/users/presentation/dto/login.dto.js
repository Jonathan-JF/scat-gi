"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDtoSchema = void 0;
const zod_1 = require("zod");
exports.LoginDtoSchema = zod_1.z.object({
    email: zod_1.z.string().email('Email inválido'),
    password: zod_1.z.string().min(8, 'Contraseña requerida'),
});
//# sourceMappingURL=login.dto.js.map