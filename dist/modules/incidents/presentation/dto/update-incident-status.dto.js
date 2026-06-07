"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateIncidentStatusDtoSchema = void 0;
const zod_1 = require("zod");
exports.UpdateIncidentStatusDtoSchema = zod_1.z.object({
    status: zod_1.z.enum(['ACTIVE', 'CONTAINED', 'RESOLVED']),
});
//# sourceMappingURL=update-incident-status.dto.js.map