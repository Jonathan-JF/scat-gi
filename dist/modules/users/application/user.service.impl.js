"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.UserServiceImpl = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_errors_1 = require("../domain/user.errors");
class UserServiceImpl {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        this.jwtExpiration = process.env.JWT_EXPIRATION || '24h';
    }
    async register(dto) {
        // Verificar si el email ya existe
        const existingUser = await this.userRepository.findByEmail(dto.email);
        if (existingUser) {
            throw new user_errors_1.UserError('EMAIL_ALREADY_EXISTS', 409, 'El email ya está registrado');
        }
        // Hashear la contraseña
        const passwordHash = await bcrypt_1.default.hash(dto.password, 10);
        // Crear el usuario
        const user = await this.userRepository.create({
            name: dto.name,
            email: dto.email,
            password: passwordHash,
            phone: dto.phone,
            role: dto.role,
        });
        const userDto = this.mapToUserResponseDto(user);
        return {
            success: true,
            data: {
                user: userDto,
            },
        };
    }
    async login(dto) {
        // Buscar el usuario por email
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new user_errors_1.UserError('INVALID_CREDENTIALS', 401, 'Email o contraseña inválidos');
        }
        // Verificar la contraseña
        const isPasswordValid = await bcrypt_1.default.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new user_errors_1.UserError('INVALID_CREDENTIALS', 401, 'Email o contraseña inválidos');
        }
        // Generar JWT
        const signOptions = { expiresIn: this.jwtExpiration };
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, this.jwtSecret, signOptions);
        const userDto = this.mapToUserResponseDto(user);
        return {
            success: true,
            data: {
                token,
                user: userDto,
            },
        };
    }
    async getProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new user_errors_1.UserError('USER_NOT_FOUND', 404, 'Usuario no encontrado');
        }
        const userDto = this.mapToUserResponseDto(user);
        return {
            success: true,
            data: userDto,
        };
    }
    mapToUserResponseDto(user) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone || undefined,
            createdAt: user.createdAt,
        };
    }
}
exports.UserServiceImpl = UserServiceImpl;
exports.UserService = UserServiceImpl;
//# sourceMappingURL=user.service.impl.js.map