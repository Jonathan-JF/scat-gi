import { RegisterDto } from '../presentation/dto/register.dto';
import { LoginDto } from '../presentation/dto/login.dto';
import { RegisterResponseDto, LoginResponseDto, ProfileResponseDto } from '../presentation/dto/user-response.dto';
export interface IUserService {
    register(dto: RegisterDto): Promise<RegisterResponseDto>;
    login(dto: LoginDto): Promise<LoginResponseDto>;
    getProfile(userId: string): Promise<ProfileResponseDto>;
}
//# sourceMappingURL=user.service.d.ts.map