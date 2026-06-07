"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportDtoSchema = void 0;
const zod_1 = require("zod");
exports.CreateReportDtoSchema = zod_1.z.object({
    description: zod_1.z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    latitude: zod_1.z.coerce.number().min(-90).max(90),
    longitude: zod_1.z.coerce.number().min(-180).max(180),
});
//# sourceMappingURL=create-report.dto.js.map