"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const register_dto_1 = require("./dto/register.dto");
const login_dto_1 = require("./dto/login.dto");
const app_error_1 = require("../../../shared/error/app.error");
class UserController {
    constructor(userService) {
        this.userService = userService;
        this.register = async (req, res) => {
            try {
                const validation = register_dto_1.RegisterDtoSchema.safeParse(req.body);
                if (!validation.success) {
                    const errors = validation.error.issues.map((e) => e.message);
                    return res.status(400).json({
                        success: false,
                        error: 'Validación fallida',
                        details: errors,
                    });
                }
                const result = await this.userService.register(validation.data);
                return res.status(201).json(result);
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        error: error.message,
                        code: error.code,
                    });
                }
                console.error('Error en register:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor',
                });
            }
        };
        this.login = async (req, res) => {
            try {
                const validation = login_dto_1.LoginDtoSchema.safeParse(req.body);
                if (!validation.success) {
                    const errors = validation.error.issues.map((e) => e.message);
                    return res.status(400).json({
                        success: false,
                        error: 'Validación fallida',
                        details: errors,
                    });
                }
                const result = await this.userService.login(validation.data);
                return res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        error: error.message,
                        code: error.code,
                    });
                }
                console.error('Error en login:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor',
                });
            }
        };
        this.getProfile = async (req, res) => {
            try {
                const userId = req.user?.id;
                if (!userId) {
                    return res.status(401).json({
                        success: false,
                        error: 'No autorizado',
                    });
                }
                const result = await this.userService.getProfile(userId);
                return res.status(200).json(result);
            }
            catch (error) {
                if (error instanceof app_error_1.AppError) {
                    return res.status(error.statusCode).json({
                        success: false,
                        error: error.message,
                        code: error.code,
                    });
                }
                console.error('Error en getProfile:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Error interno del servidor',
                });
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map