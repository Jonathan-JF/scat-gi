"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_service_impl_1 = require("../application/user.service.impl");
const user_repository_1 = require("../infrastructure/user.repository");
const auth_middleware_1 = require("../../../middleware/auth.middleware");
const rate_limit_middleware_1 = require("../../../middleware/rate-limit.middleware");
const router = (0, express_1.Router)();
const userRepository = new user_repository_1.UserRepository();
const userService = new user_service_impl_1.UserService(userRepository);
const userController = new user_controller_1.UserController(userService);
router.post('/auth/register', rate_limit_middleware_1.authRateLimiter, userController.register);
router.post('/auth/login', rate_limit_middleware_1.authRateLimiter, userController.login);
router.get('/users/me', auth_middleware_1.authMiddleware, userController.getProfile);
exports.default = router;
//# sourceMappingURL=user.routes.js.map