"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIncidentDtoSchema = void 0;
const zod_1 = require("zod");
exports.CreateIncidentDtoSchema = zod_1.z.object({
    reportId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(3),
    description: zod_1.z.string().optional(),
    severity: zod_1.z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).default('MEDIUM'),
});
//# sourceMappingURL=create-incident.dto.js.map