"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const role_middleware_1 = require("../../../middleware/role.middleware");
const incident_controller_1 = require("./incident.controller");
const incident_service_impl_1 = require("../application/incident.service.impl");
const incident_repository_1 = require("../infrastructure/incident.repository");
const router = (0, express_1.Router)();
const incidentRepository = new incident_repository_1.IncidentRepository();
const incidentService = new incident_service_impl_1.IncidentService(incidentRepository);
const incidentController = new incident_controller_1.IncidentController(incidentService);
router.post('/incidents', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), incidentController.create);
router.get('/incidents/history', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), incidentController.findHistory);
router.get('/incidents', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), incidentController.findActive);
router.get('/incidents/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), incidentController.findById);
router.patch('/incidents/:id/status', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), incidentController.updateStatus);
exports.default = router;
//# sourceMappingURL=incident.routes.js.map