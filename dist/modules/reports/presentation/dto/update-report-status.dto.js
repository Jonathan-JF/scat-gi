"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReportStatusDtoSchema = void 0;
const zod_1 = require("zod");
exports.UpdateReportStatusDtoSchema = zod_1.z.object({
    status: zod_1.z.enum(['PENDING', 'REVIEWED', 'REJECTED']),
});
//# sourceMappingURL=update-report-status.dto.js.map