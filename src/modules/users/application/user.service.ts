import { RegisterDto } from '../presentation/dto/register.dto';
import { LoginDto } from '../presentation/dto/login.dto';
import { UserResponseDto, RegisterResponseDto, LoginResponseDto, ProfileResponseDto } from '../presentation/dto/user-response.dto';

export interface IUserService {
  register(dto: RegisterDto): Promise<RegisterResponseDto>;
  login(dto: LoginDto): Promise<LoginResponseDto>;
  getProfile(userId: string): Promise<ProfileResponseDto>;
}
