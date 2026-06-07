"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const role_middleware_1 = require("../../../middleware/role.middleware");
const alert_controller_1 = require("./alert.controller");
const alert_service_impl_1 = require("../application/alert.service.impl");
const alert_repository_1 = require("../infrastructure/alert.repository");
const twilio_client_1 = require("../infrastructure/twilio.client");
const router = (0, express_1.Router)();
const alertRepository = new alert_repository_1.AlertRepository();
const twilioClient = new twilio_client_1.TwilioClient();
const alertService = new alert_service_impl_1.AlertService(alertRepository, twilioClient);
const alertController = new alert_controller_1.AlertController(alertService);
router.get('/alerts', auth_middleware_1.authMiddleware, alertController.findActive);
router.get('/alerts/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN', 'CITIZEN'), alertController.findById);
router.post('/alerts/:id/retry', auth_middleware_1.authMiddleware, (0, role_middleware_1.requireRole)('OPERATOR', 'ADMIN'), alertController.retry);
exports.default = router;
//# sourceMappingURL=alert.routes.js.map