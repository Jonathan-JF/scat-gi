import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { RegisterDto } from '../presentation/dto/register.dto';
import { LoginDto } from '../presentation/dto/login.dto';
import { UserResponseDto, RegisterResponseDto, LoginResponseDto, ProfileResponseDto } from '../presentation/dto/user-response.dto';
import { IUserService } from './user.service';
import { UserRepository } from '../infrastructure/user.repository';
import { UserError } from '../domain/user.errors';

export class UserServiceImpl implements IUserService {
  private jwtSecret: string;
  private jwtExpiration: string;

  constructor(private userRepository: UserRepository) {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    this.jwtExpiration = process.env.JWT_EXPIRATION || '24h';
  }

  async register(dto: RegisterDto): Promise<RegisterResponseDto> {
    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new UserError('EMAIL_ALREADY_EXISTS', 409, 'El email ya está registrado');
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(dto.password, 10);

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

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    // Buscar el usuario por email
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UserError('INVALID_CREDENTIALS', 401, 'Email o contraseña inválidos');
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UserError('INVALID_CREDENTIALS', 401, 'Email o contraseña inválidos');
    }

    // Generar JWT
    const signOptions: SignOptions = { expiresIn: this.jwtExpiration as SignOptions['expiresIn'] };
    const token = jwt.sign({ userId: user.id, role: user.role }, this.jwtSecret, signOptions);

    const userDto = this.mapToUserResponseDto(user);

    return {
      success: true,
      data: {
        token,
        user: userDto,
      },
    };
  }

  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserError('USER_NOT_FOUND', 404, 'Usuario no encontrado');
    }

    const userDto = this.mapToUserResponseDto(user);

    return {
      success: true,
      data: userDto,
    };
  }

  private mapToUserResponseDto(user: any): UserResponseDto {
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

// Exportar como clase para facilitar la inyección de dependencias
export { UserServiceImpl as UserService };

