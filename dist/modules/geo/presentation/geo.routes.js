"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const role_middleware_1 = require("../../../middleware/role.middleware");
const geo_controller_1 = require("./geo.controller");
const geo_service_1 = require("../application/geo.service");
const geo_repository_1 = require("../infrastructure/geo.repository");
const router = (0, express_1.Router)();
const geoRepository = new geo_repository_1.GeoRepository();
const geoService = new geo_service_1.GeoService(geoRepository);
const geoController = new geo_controller_1.GeoController(geoService);
router.get('/geo/incidents/active', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), geoController.getActiveIncidents);
router.get('/geo/reports/recent', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), geoController.getRecentReports);
router.get('/geo/risk-zones', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), geoController.getRiskZones);
exports.default = router;
//# sourceMappingURL=geo.routes.js.map